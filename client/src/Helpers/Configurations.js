export const selectorStyles = {
    menu: (provided, state) => ({
        ...provided,
        color: '#EEF0F6',
        padding: 0,
        backgroundColor: '#1C2238',
    }),

    singleValue: (provided, state) => ({
        ...provided,
        opacity: state.isDisabled ? 0.5 : 1,
        transition: 'opacity 300ms',
        color: '',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: '',
        color: state.isSelected ? '#987EEC' : '#A8A8A8',
    }),

    control: (provided, state) => ({
        ...provided,
        opacity: state.isDisabled ? 0.5 : 1,
        transition: 'opacity 300ms',
        backgroundColor: 'transparent',
        border: 0,
        boxShadow: 'none',
    }),
};
