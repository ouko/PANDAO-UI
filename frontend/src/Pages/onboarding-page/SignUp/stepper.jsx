import { motion } from 'framer-motion';
import {  Circle } from 'lucide-react';
import React, { useState } from 'react';

export const steps = [
    { label: 'Introduction' },
    {
        label: 'Personal Information',
        fields: [
            { name: 'name', type: 'text', placeholder: 'Name' },
            { name: 'email', type: 'email', placeholder: 'Email' },
        ],
    },
    {
        label: 'Address Details',
        fields: [
            { name: 'address', type: 'text', placeholder: 'Address' },
            { name: 'city', type: 'text', placeholder: 'City' },
            { name: 'country', type: 'text', placeholder: 'Country' },
        ],
    },

];

export const StepIndicator2 = ({ currentStep, steps }) => (
    <div className="relative w-full">
        <div className="flex items-center justify-between px-10">
            {steps.map((step, index) => (
                <React.Fragment key={step.label}>
                    <div className="flex flex-col items-center">
                        <motion.div
                            className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${index <= currentStep
                                ? 'bg-brand4 text-white'
                                : 'bg-gray-200 text-white dark:bg-gray-800 dark:text-gray-600'
                                }`}
                            animate={{ scale: 1.02 }}
                        >
                            {index < currentStep ? (<Circle size={17} fill="currentColor" />
                            ) : (
                                <Circle size={17} fill="currentColor" />
                            )}
                        </motion.div>
                    </div>
                    {index < steps.length - 1 && (
    <div className="relative flex-grow">
        {/* Dotted Line */}
        <div className="absolute -top-0.5 h-1.5 w-full border-t-4 border-dotted  border-gray-400 dark:border-gray-600" />

        {/* Animated Progress */}
        <motion.div
            className="absolute -top-0.5 h-1.5 w-full border-t-4 border-dotted border-brand4"
            
            initial={{ width: '0%' }}
            animate={{
                width: index < currentStep ? '100%' : '0%',
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
    </div>
)}

                </React.Fragment>
            ))}
        </div>
    </div>
);

const StepContent = () => (
    <div className="my-4 flex min-h-[30vh] w-full items-center justify-center rounded-lg border bg-gray-100 text-center dark:border-gray-600 dark:bg-gray-800">
        Stepper Content
    </div>
);

const ButtonClasses =
    'rounded-2xl bg-red-500 px-2 py-1 text-sm font-medium text-white';

const NavigationButtons = ({ currentStep, totalSteps, handlePrev, handleNext }) => (
    <div className="flex justify-end gap-3">
        {currentStep > 0 && (
            <button onClick={handlePrev} className={ButtonClasses}>
                Previous
            </button>
        )}
        {currentStep < totalSteps - 1 && (
            <button onClick={handleNext} className={ButtonClasses}>
                Next
            </button>
        )}
    </div>
);

const Stepper2 = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handlePrev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="mx-auto w-full max-w-2xl p-6">
            <StepContent />
            <NavigationButtons
                currentStep={currentStep}
                totalSteps={steps.length}
                handlePrev={handlePrev}
                handleNext={handleNext}
            />
        </div>
    );
};

export default Stepper2;
