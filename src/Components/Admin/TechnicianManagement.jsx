import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Avatar } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';


const initialTechnician = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    expertise: '',
    image: null,
};

const TechnicianManagement = () => {
    
    const { enqueueSnackbar } = useSnackbar();
    const [technicians, setTechnicians] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentTechnician, setCurrentTechnician] = useState(initialTechnician);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Sample data for technicians
    const sampleTechnicians = [
        { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', contactNumber: '123-456-7890', address: '123 Main St', expertise: 'Plumbing', image: { url: 'https://via.placeholder.com/150' } },
        { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', contactNumber: '987-654-3210', address: '456 Elm St', expertise: 'Electrical', image: { url: 'https://via.placeholder.com/150' } },
        { id: '3', firstName: 'Michael', lastName: 'Johnson', email: 'michael.johnson@example.com', contactNumber: '456-789-0123', address: '789 Oak St', expertise: 'Carpentry', image: { url: 'https://via.placeholder.com/150' } },
    ];

    useEffect(() => {
        setLoading(true);
        // Simulate fetching data
        setTimeout(() => {
            setTechnicians(sampleTechnicians);
            setLoading(false);
        }, 1000);

        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            setError(null);
        }
    }, [error, enqueueSnackbar]);

    const handleOpenDialog = () => {
        setDialogOpen(true);
        setCurrentTechnician(initialTechnician);
        setEditMode(false);
        setImagePreview(null);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCurrentTechnician(initialTechnician);
        setEditMode(false);
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentTechnician({ ...currentTechnician, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveTechnician = () => {
        if (editMode) {
            // Update existing technician
            const updatedTechnicians = technicians.map((tech) =>
                tech.id === currentTechnician.id ? { ...currentTechnician } : tech
            );
            setTechnicians(updatedTechnicians);
            enqueueSnackbar('Technician updated successfully.', { variant: 'success' });
        } else {
            // Add new technician
            const newTechnician = { ...currentTechnician, id: String(technicians.length + 1) };
            setTechnicians([...technicians, newTechnician]);
            enqueueSnackbar('Technician added successfully.', { variant: 'success' });
        }
        handleCloseDialog();
    };

    const handleEditTechnician = (technician) => {
        setCurrentTechnician(technician);
        setEditMode(true);
        setDialogOpen(true);
        setImagePreview(technician.image?.url || null);
    };

    const handleDeleteTechnician = (id) => {
        const filteredTechnicians = technicians.filter((tech) => tech.id !== id);
        setTechnicians(filteredTechnicians);
        enqueueSnackbar('Technician deleted successfully.', { variant: 'success' });
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.1 },
        { field: 'firstName', headerName: 'First Name', flex: 0.7 },
        { field: 'contactNumber', headerName: 'Contact Number', flex: 0.7 },
        { field: 'address', headerName: 'Address', flex: 1 },
        { field: 'expertise', headerName: 'Expertise', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEditTechnician(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTechnician(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const rows = technicians.map((tech) => ({
        id: tech.id,
        firstName: tech.firstName,
        contactNumber: tech.contactNumber,
        address: tech.address,
        expertise: tech.expertise,
    }));

    return (
        <>
            <div className="flex justify-between items-center gap-2 sm:gap-12 mb-4">
                <h1 className="text-lg font-medium uppercase">Technicians</h1>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDialog}
                >
                    Add Technician
                </Button>
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 450, overflowX: 'auto' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    loading={loading}
                    disableSelectionOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>

            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{editMode ? 'Edit Technician' : 'Add New Technician'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        fullWidth
                        value={currentTechnician.firstName}
                        onChange={(e) => setCurrentTechnician({ ...currentTechnician, firstName: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        value={currentTechnician.lastName}
                        onChange={(e) => setCurrentTechnician({ ...currentTechnician, lastName: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={currentTechnician.email}
                        onChange={(e) => setCurrentTechnician({ ...currentTechnician, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Contact Number"
                        fullWidth
                        value={currentTechnician.contactNumber}
                        onChange={(e) => setCurrentTechnician({ ...currentTechnician, contactNumber: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        fullWidth
                        value={currentTechnician.address}
                        onChange={(e) => setCurrentTechnician({ ...currentTechnician, address: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Expertise"
                        fullWidth
                        value={currentTechnician.expertise}
                        onChange={(e) => setCurrentTechnician({ ...currentTechnician, expertise: e.target.value })}
                    />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-image"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="upload-image">
                        <Button variant="contained" color="primary" component="span">
                            Upload Image
                        </Button>
                    </label>
                    {imagePreview && (
                        <div>
                            <Avatar src={imagePreview} alt="Image Preview" sx={{ width: 150, height: 150, mt: 2 }} />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveTechnician} color="primary" variant="contained">
                        {editMode ? 'Save Changes' : 'Add Technician'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TechnicianManagement;
