import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { updateProductImages } from '../../redux/adminSlices/productHandler';

const UpdateProductImages = ({ product }) => {
    const dispatch = useDispatch();

    const [newThemeImage, setNewThemeImage] = useState(null);
    const [newOtherImages, setNewOtherImages] = useState([]);

    const {loading} = useSelector((state) => state.productHandler);

    const handleNewThemeImageChange = (e) => {
        const file = e.target.files[0];
        setNewThemeImage(file);
    };

    const handleNewOtherImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setNewOtherImages([...newOtherImages, ...files]);
    };

    const handleDeleteNewOtherImage = (index) => {
        const updatedImages = newOtherImages.filter((_, i) => i !== index);
        setNewOtherImages(updatedImages);
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(newOtherImages);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setNewOtherImages(items);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateProductImages(product._id, newThemeImage , newOtherImages));
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Current Images</h2>
            <div className="flex flex-col gap-2">
                <div>
                    <h3 className="font-medium">Theme Image</h3>
                    {product.themeImage ? (
                        <div className="flex items-center gap-2">
                            <img src={product.themeImage.url} alt="Theme" className="w-32 h-32 object-cover" />
                        </div>
                    ) : (
                        <p>No theme image available</p>
                    )}
                </div>
                <div>
                    <h3 className="font-medium">Other Images</h3>
                    {product.otherImages && product.otherImages.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {product.otherImages.map((img, index) => (
                                <div key={index} className="relative">
                                    <img src={img.url} alt={`Other ${index}`} className="w-32 h-32 object-cover" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No other images available</p>
                    )}
                </div>
            </div>
            <h2 className="text-xl font-bold">Upload New Images</h2>
            <div className="flex flex-col gap-2">
                <div>
                    <h3 className="font-medium">New Theme Image</h3>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewThemeImageChange}
                    />
                    {newThemeImage && (
                        <div className="mt-2">
                            <img
                                src={URL.createObjectURL(newThemeImage)}
                                alt="New Theme"
                                className="w-32 h-32 object-cover"
                            />
                            <p>{newThemeImage.name}</p>
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="font-medium">New Other Images</h3>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleNewOtherImagesChange}
                    />
                    {newOtherImages.length > 0 && (
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="newOtherImages" direction="horizontal">
                                {(provided) => (
                                    <div
                                        className="flex flex-wrap gap-2 mt-2"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {newOtherImages.map((img, index) => (
                                            <Draggable key={img.name} draggableId={img.name} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="relative"
                                                    >
                                                        <img
                                                            src={URL.createObjectURL(img)}
                                                            alt={`New Other ${index}`}
                                                            className="w-32 h-32 object-cover"
                                                        />
                                                        <p>{img.name}</p>
                                                        <IconButton
                                                            size="small"
                                                            className="absolute top-0 right-0"
                                                            onClick={() => handleDeleteNewOtherImage(index)}
                                                        >
                                                            <DeleteIcon className="text-red-500" />
                                                        </IconButton>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )}
                </div>
            </div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="self-start"
                disabled={loading}
            >
                Update Images

                {loading ? <Loader/> : null}
            </Button>
        </form>
    );
};

export default UpdateProductImages;
