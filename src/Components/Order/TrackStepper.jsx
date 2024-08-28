import { Step, StepLabel, Stepper } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { formatDate } from '../../utils/functions';

const TrackStepper = ({ activeStep, orderOn, shippedAt, deliveredAt, status }) => {

    const steps = [
        {
            status: "Ordered",
            dt: formatDate(orderOn),
        },
        {
            status: "Processing",
            dt: formatDate(orderOn), // Assuming orderOn is the same as processing date
        },
        {
            status: "Shipped",
            dt: formatDate(shippedAt),
        },
        {
            status: "Delivered",
            dt: formatDate(deliveredAt),
        },
    ];

    // Filter steps based on the current status
    const filteredSteps = steps.filter(step => {
        if (status === 'cancelled') {
            return step.status === 'Ordered' || step.status === 'Cancelled';
        } else if (status === 'shipped') {
            return step.status !== 'Delivered';
        }
        return true;
    });

    const completedIcon = <span className="text-primary-green animate-pulse"><CircleIcon sx={{ fontSize: "16px" }} /></span>;
    const pendingIcon = <span className="text-gray-400"><CircleIcon sx={{ fontSize: "16px" }} /></span>;

    return (
        <>
            <Stepper activeStep={activeStep} alternativeLabel>
                {filteredSteps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            icon={
                                activeStep >= index ? completedIcon : pendingIcon
                            }
                        >
                            {activeStep >= index ? (
                                <div className="flex flex-col">
                                    <span className="text-primary-green font-medium">{item.status}</span>
                                    {item.dt !== "Invalid Date" && (
                                        <span className="text-primary-green font-medium">{item.dt}</span>
                                    )}
                                </div>
                            ) : (
                                <span className="text-gray-400 font-medium">{item.status}</span>
                            )}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className="mt-4">
                <p className="font-medium">Current Status: {status}</p>
            </div>
        </>
    );
};

export default TrackStepper;
