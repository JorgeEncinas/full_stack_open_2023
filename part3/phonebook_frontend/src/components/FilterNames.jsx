const FilterNames = ({filterName, handleFilterNameChange}) => {
    return (
      <div>
        <h3>Filter</h3>
        <input
          value={filterName}
          onChange={handleFilterNameChange}
        />
        <hr />
      </div>
    )
}

export default FilterNames