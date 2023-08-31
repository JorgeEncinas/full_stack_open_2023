const AddPBEntry = ({newName, handleNameChange, newPhone, handlePhoneChange}) => {
    return (
      <>
        <h1>Add new entry to phonebook</h1>
            <div>
              name: <input
                      value={newName}
                      onChange={handleNameChange} 
                    />
            </div>
            <div>
              phone number:
              <input
                value={newPhone}
                onChange={handlePhoneChange}
              />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
      </>
    )
}

export default AddPBEntry