import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/adminSlices/categoryHandler';
import DeleteIcon from '@mui/icons-material/Delete';
import { createProduct } from '../../redux/adminSlices/productHandler';


const NewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const { categories, loading: catLoading } = useSelector((state) => state.categoryHandler);
    const { loading } = useSelector((state) => state.productHandler);

    const [selectedCategory , setSelectedCategory] = useState({}); 
    const [subCategories , setSubCategories] = useState([]);

    useEffect(() => {
        setSubCategories(selectedCategory.subCategories || []);
    },[selectedCategory])


    const [highlights, setHighlights] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [highlightInput, setHighlightInput] = useState("");
    const [specsInput, setSpecsInput] = useState({
        title: "",
        description: ""
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [cuttedPrice, setCuttedPrice] = useState(0);
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [status, setStatus] = useState("");
    const [gst, setGst] = useState(0);
    const [themeImage, setThemeImage] = useState(null);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [themeImagePreview, setThemeImagePreview] = useState("");

    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    };

    const addSpecs = () => {
        if (!specsInput.title.trim() || !specsInput.description.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: "", description: "" });
    };

    const addHighlight = () => {
        if (!highlightInput.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput("");
    };

    const deleteHighlight = (index) => {
        setHighlights(highlights.filter((h, i) => i !== index));
    };

    const deleteSpec = (index) => {
        setSpecs(specs.filter((s, i) => i !== index));
    };

    const handleThemeImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setThemeImagePreview(reader.result);
                setThemeImage(e.target.files[0]);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldImages) => [...oldImages, reader.result]);
                    setImages((oldImages) => [...oldImages, file]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const newProductSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(highlights)

        if (highlights.length <= 0) {
            toast.error("Add Highlights");
            return;
        }
        if (!themeImage) {
            toast.error("Add Theme Image");
            return;
        }
        // if (specs.length <= 1) {
        //     toast.error("Add Minimum 2 Specifications");
        //     return;
        // }
        if (images.length <= 0) {
            toast.error("Add Product Images");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("cuttedPrice", cuttedPrice);
        formData.append("categoryId", categoryId);
        formData.append("subCategoryId", subCategoryId);
        formData.append("status", status);
        formData.append("gst", gst);
        formData.append("themeImage", themeImage);

        images.forEach((image) => {
            formData.append("images", image);
        });

        highlights.forEach((h) => {
            formData.append("highlights", h);
        });

        specs.forEach((s) => {
            formData.append("specifications", JSON.stringify(s));
        });
        

        dispatch(createProduct(formData , clearForm))

    };

    const clearForm = () => {
        setName("");
        setDescription("");
        setPrice(0);
        setCuttedPrice(0);
        setCategoryId("");
        setSubCategoryId("");
        setStatus("");
        setGst(0);
        setHighlights([]);
        setHighlightInput("");
        setSpecs([]);
        setSpecsInput({ title: "", description: "" });
        setImages([]);
        setImagesPreview([]);
        setThemeImage(null);
        setThemeImagePreview("");
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
            const newSpecifications = Array.from(specs);
            const [movedSpecification] = newSpecifications.splice(source.index, 1);
            newSpecifications.splice(destination.index, 0, movedSpecification);
            setSpecs(newSpecifications);
        }
    };

    return (
        <div>
            <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
                <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            rows="3"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2 w-1/2 mr-2">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                min="0"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="border rounded p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 ml-2">
                            <label htmlFor="cuttedPrice">Cutted Price</label>
                            <input
                                type="number"
                                id="cuttedPrice"
                                min="0"
                                required
                                value={cuttedPrice}
                                onChange={(e) => setCuttedPrice(e.target.value)}
                                className="border rounded p-2"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2 w-1/2 mr-2">
                            <label htmlFor="gst">GST</label>
                            <input
                                type="number"
                                id="gst"
                                min="0"
                                required
                                value={gst}
                                onChange={(e) => setGst(e.target.value)}
                                className="border rounded p-2"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 ml-2">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="border rounded p-2"
                            >
                                <option value="">Select Status</option>
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="themeImage">Theme Image</label>
                        <input
                            type="file"
                            id="themeImage"
                            accept="image/*"
                            onChange={handleThemeImageChange}
                            className="border rounded p-2"
                        />
                        {themeImagePreview && (
                            <div className="flex items-center justify-center p-2 border border-gray-300 rounded">
                                <img src={themeImagePreview} alt="Theme Preview" className="max-h-40"/>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="productImages">Product Images</label>
                        <input
                            type="file"
                            id="productImages"
                            accept="image/*"
                            multiple
                            onChange={handleProductImageChange}
                            className="border rounded p-2"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {imagesPreview.map((img, index) => (
                                <img key={index} src={img} alt="Product Preview" className="max-h-20"/>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Category</label>
                        {catLoading ? (
                            <Loader />
                        ) : (
                            <select
                                value={categoryId}
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                    setSelectedCategory(categories.find((cat) => cat._id === e.target.value));
                                }}
                                className="border rounded p-2"
                            >
                                <option value="">Select Category</option>
                                {categories && categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Sub Category</label>
                        <select
                            value={subCategoryId}
                            onChange={(e) => setSubCategoryId(e.target.value)}
                            className="border rounded p-2"
                        >
                            <option value="">Select Sub Category</option>
                            {subCategories && subCategories.map((sub) => (
                                <option key={sub._id} value={sub._id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Highlights</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={highlightInput}
                                onChange={(e) => setHighlightInput(e.target.value)}
                                className="border rounded p-2 flex-1"
                            />
                            <button type="button" onClick={addHighlight} className="p-2 bg-blue-500 text-white rounded">
                                Add
                            </button>
                        </div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="highlights">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef} className="border rounded p-2">
                                        {highlights.map((highlight, index) => (
                                            <Draggable key={index} draggableId={`highlight-${index}`} index={index}>
                                                {(provided) => (
                                                    <li
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        className="flex justify-between items-center p-2 border-b"
                                                    >
                                                        {highlight}
                                                        <button type="button" onClick={() => deleteHighlight(index)} className="p-2 bg-red-500 text-white rounded">
                                                            <DeleteIcon />
                                                        </button>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Specifications</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={specsInput.title}
                                onChange={handleSpecsChange}
                                className="border rounded p-2 flex-1"
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={specsInput.description}
                                onChange={handleSpecsChange}
                                className="border rounded p-2 flex-1"
                            />
                            <button type="button" onClick={addSpecs} className="p-2 bg-blue-500 text-white rounded">
                                Add
                            </button>
                        </div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="specifications">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef} className="border rounded p-2">
                                        {specs.map((spec, index) => (
                                            <Draggable key={index} draggableId={`spec-${index}`} index={index}>
                                                {(provided) => (
                                                    <li
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        className="flex justify-between items-center p-2 border-b"
                                                    >
                                                        <div className="flex-1">
                                                            <p className="font-bold">{spec.title}</p>
                                                            <p>{spec.description}</p>
                                                        </div>
                                                        <button type="button" onClick={() => deleteSpec(index)} className="p-2 bg-red-500 text-white rounded">
                                                            <DeleteIcon />
                                                        </button>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="p-2 bg-green-500 text-white rounded">
                            {loading ? <Loader /> : "Create Product"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewProduct;
