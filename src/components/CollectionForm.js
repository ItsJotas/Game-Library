import Select from 'react-select';

const CollectionForm = ({ formData, handleChange, handleSubmit, games }) => {

    const gameOptions = games.map(game => ({
        value: game.id,
        label: game.name
    }));

    const handleGameChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        handleChange({
            target: {
                name: 'gameIds',
                value: selectedIds
            }
        });
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: 'var(--header-background-color)',
            border: 'none',
            color: 'var(--font-color-white)',
            fontFamily: 'var(--font-moderustic)',
        }),
        input: (base) => ({
            ...base,
            color: 'var(--font-color-white)',
        }),
        singleValue: (base) => ({
            ...base,
            color: 'var(--font-color-white)',
            }),
        menu: (base) => ({
            ...base,
            backgroundColor: 'var(--header-background-color)',
            border: 'none',
            boxShadow: 'none',
            marginTop: 0,
        }),
        menuList: (base) => ({
            ...base,
            backgroundColor: 'var(--header-background-color)',
            padding: 0,
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
                ? '#000000'
                : 'var(--header-background-color)',
            color: 'var(--font-color-white)',
            fontFamily: 'var(--font-moderustic)',
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: 'var(--font-color-white)',
            color: 'var(--header-background-color)',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: 'var(--header-background-color)',
            fontFamily: 'var(--font-moderustic)',
        }),
    };

    return (
        <form onSubmit={handleSubmit} className="collection-form">

            <div class="collection-form-inputs">
                <label class="collection-form-text">Collection Name: </label>
                <input class="collection-form-text-input" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="off"/>
            </div>

            <div className="collection-form-inputs">
                <label className="collection-form-text">Games:</label>
                <Select
                    isMulti
                    options={gameOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onChange={handleGameChange}
                    value={gameOptions.filter(option => formData.gameIds.includes(option.value))}
                    styles={customStyles}
                />
            </div>
            
        </form>
    )
}

export default CollectionForm;