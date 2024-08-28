import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails, updateProductDetails } from '../../redux/adminSlices/productHandler';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../Loader/Loader';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import UpdateProductImages from './UpdateProductImages';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [cuttedPrice, setCuttedPrice] = useState('');
    const [highlights, setHighlights] = useState([]);
    const [specifications, setSpecifications] = useState([]);
    const [newHighlight, setNewHighlight] = useState('');
    const [newSpecTitle, setNewSpecTitle] = useState('');
    const [newSpecDescription, setNewSpecDescription] = useState('');
    const [status, setStatus] = useState('');
    const [gst, setGst] = useState('');
    const [loading, setLoading] = useState(false);

    const { product } = useSelector((state) => state.productHandler);

    useEffect(() => {
        dispatch(productDetails(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product?.price?.$numberDecimal);
            setCuttedPrice(product?.cuttedPrice?.$numberDecimal);
            setHighlights(product?.highlights || []);
            setSpecifications(product?.specifications || []);
            setStatus(product?.status || '');
            setGst(product?.gst?.$numberDecimal || '');
        }
    }, [product]);

    const handleHighlightAdd = () => {
        setHighlights([...highlights, newHighlight]);
        setNewHighlight('');
    };

    const handleHighlightDelete = (index) => {
        setHighlights(highlights.filter((_, i) => i !== index));
    };

    const handleSpecificationAdd = () => {
        setSpecifications([...specifications, { title: newSpecTitle, description: newSpecDescription }]);
        setNewSpecTitle('');
        setNewSpecDescription('');
    };

    const handleSpecificationDelete = (index) => {
        setSpecifications(specifications.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            name,
            description,
            price,
            cuttedPrice,
            highlights,
            specifications,
            status,
            gst
        };
        
        try {
            await dispatch(updateProductDetails(formData, product._id));
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setLoading(false);
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === 'highlights') {
            const newHighlights = Array.from(highlights);
            const [movedHighlight] = newHighlights.splice(source.index, 1);
            newHighlights.splice(destination.index, 0, movedHighlight);
            setHighlights(newHighlights);
        } else if (source.droppableId === 'specifications') {
            const newSpecifications = Array.from(specifications);
            const [movedSpecification] = newSpecifications.splice(source.index, 1);
            newSpecifications.splice(destination.index, 0, movedSpecification);
            setSpecifications(newSpecifications);
        }
    };

    return (

        <div>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
                <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-between">
                        <TextField
                            label="Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                },
                            }}
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            label="Cutted Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                },
                            }}
                            required
                            value={cuttedPrice}
                            onChange={(e) => setCuttedPrice(e.target.value)}
                        />
                    </div>
                    <TextField
                        label="GST"
                        type="number"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            inputProps: {
                                min: 0,
                            },
                        }}
                        required
                        value={gst}
                        onChange={(e) => setGst(e.target.value)}
                    />
                    <TextField
                        select
                        label="Status"
                        variant="outlined"
                        size="small"
                        required
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="Draft">Draft</MenuItem>
                        <MenuItem value="Published">Published</MenuItem>
                    </TextField>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center border rounded">
                            <input
                                type="text"
                                placeholder="Highlight"
                                className="px-2 flex-1 outline-none border-none"
                                value={newHighlight}
                                onChange={(e) => setNewHighlight(e.target.value)}
                            />
                            <span
                                className="py-2 px-6 text-white bg-green-500 rounded-r hover:shadow-lg cursor-pointer"
                                onClick={handleHighlightAdd}
                            >
                                Add
                            </span>
                        </div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="highlights">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-1.5 mt-2">
                                        {highlights.map((highlight, index) => (
                                            <Draggable key={index} draggableId={`highlight-${index}`} index={index}>
                                                {(provided) => (
                                                    <div 
                                                        ref={provided.innerRef} 
                                                        {...provided.draggableProps} 
                                                        {...provided.dragHandleProps} 
                                                        className="flex justify-between items-center border p-2 rounded"
                                                    >
                                                        {highlight}
                                                        <DeleteIcon
                                                            className="text-red-500 cursor-pointer"
                                                            onClick={() => handleHighlightDelete(index)}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
                <div className="flex flex-col gap-2 m-2 sm:w-1/2">
                    <h2 className="font-medium">Specifications</h2>
                    <div className="flex justify-evenly gap-2 items-center">
                        <TextField
                            name="title"
                            label="Name"
                            placeholder="Model No"
                            variant="outlined"
                            size="small"
                            value={newSpecTitle}
                            onChange={(e) => setNewSpecTitle(e.target.value)}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            placeholder="WJDK42DF5"
                            variant="outlined"
                            size="small"
                            value={newSpecDescription}
                            onChange={(e) => setNewSpecDescription(e.target.value)}
                        />
                        <span
                            className="py-2 px-6 text-white bg-green-500 rounded hover:shadow-lg cursor-pointer"
                            onClick={handleSpecificationAdd}
                        >
                            Add
                        </span>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="specifications">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-1.5 mt-2">
                                    {specifications.map((spec, index) => (
                                        <Draggable key={index} draggableId={`spec-${index}`} index={index}>
                                            {(provided) => (
                                                <div 
                                                    ref={provided.innerRef} 
                                                    {...provided.draggableProps} 
                                                    {...provided.dragHandleProps} 
                                                    className="flex justify-between items-center border p-2 rounded"
                                                >
                                                    <strong>{spec?.title}:</strong> {spec?.description}
                                                    <DeleteIcon
                                                        className="text-red-500 cursor-pointer"
                                                        onClick={() => handleSpecificationDelete(index)}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className="flex justify-center items-center gap-3 mt-4">
                        <input
                            form="mainform"
                            type="submit"
                            className="uppercase w-1/3 p-3 text-white bg-green-500 font-medium rounded shadow hover:shadow-lg cursor-pointer"
                            value="Update"
                            disabled={loading}
                        />
                        {loading && <Loader />}
                    </div>
                </div>
            </form>


            <div className="flex flex-col bg-white rounded-lg shadow p-4 mt-10">
                
                <h2 className='text-2xl font-bold mb-10'>
                    Product Images
                </h2>


                <UpdateProductImages product={product} />

            </div>
        </div>

    );
};

export default UpdateProduct;
