//------------Helper functions--------------------

// Checks if an array has only numbers
export const onlyNumbers = (array) => {
    return array.every((elem) => !isNaN(parseInt(elem)));
};
