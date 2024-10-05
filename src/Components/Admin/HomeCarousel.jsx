import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomeCarousel } from '../../redux/slices/dataFetch';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { addNewImagesToCarousel, fetchHomeCarouselAdmin, updateHomeCarouselAdmin } from '../../redux/adminSlices/carouselHandler';
import Loader from '../Loader/Loader';
import axios from 'axios'; // assuming you use axios for API calls
import BigLoader from '../Loader/BigLoader';


const HomeCarousel = () => {
    const dispatch = useDispatch();
    const { loading, carousel } = useSelector((state) => state.carouselHandler);
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        dispatch(fetchHomeCarouselAdmin());
    }, [dispatch]);

    useEffect(() => {
        if (carousel?.images) {
            setImages(carousel.images);
        }
    }, [carousel]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(images);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setImages(items);
    };

    const saveNewOrder = async () => {
        dispatch(updateHomeCarouselAdmin(carousel._id, images));
    };

    const handleImageUpload = async () => {
        if (newImages.length === 0) return;

        const formData = new FormData();
        newImages.forEach((image) => {
            formData.append('file', image);
        });

        dispatch(addNewImagesToCarousel(carousel._id,formData));
    };

    return (
        loading ? <BigLoader /> :
        <div>
            <h2 className='text-3xl font-bold mb-4'>
                {carousel?.title}
            </h2>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="carousel">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-wrap gap-4">
                            {images.map((image, index) => (
                                <Draggable key={image._id} draggableId={image._id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="mb-2 p-2 border rounded w-fit"
                                        >
                                            <img src={image?.url} alt={'Carousel Image'} className="w-full h-40 object-contain" />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button onClick={saveNewOrder} className="mt-4 p-2 flex justify-center items-center gap-3 bg-blue-500 text-white rounded">
                Save New Order
                {loading ? <Loader /> : null}
            </button>

            <div className="mt-4">
                <h2 className='text-3xl font-bold mb-4 mt-10'>Upload New Images</h2>
                <input
                    type="file"
                    multiple
                    onChange={(e) => setNewImages(Array.from(e.target.files))}
                    className="mb-2"
                />
                <button onClick={handleImageUpload} className="p-2 bg-green-500 text-white rounded">
                    Upload New Images
                </button>
            </div>
        </div>
    );
};

export default HomeCarousel;
