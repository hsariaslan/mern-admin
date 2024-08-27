import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface MultiSelectProps {
    options: object[];
}

const animatedComponents = makeAnimated();

export default function MultiSelect({options}: MultiSelectProps) {
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
        />
    );
}