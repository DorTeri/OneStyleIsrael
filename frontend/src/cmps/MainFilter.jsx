import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getSvg } from '../services/svg.service'
import { NavLink, useNavigate } from 'react-router-dom'

function MainFilter({ setShowInput, onNavClick }) {
  const brands = useSelector((storeState) => storeState.productsModule.brands)
  console.log(brands)

  const [searchQuery, setSearchQuery] = useState('') // state variable for search query

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value) // update search query state variable
  }

  const regex = new RegExp(searchQuery, 'i') // create regex to match search query (case-insensitive)

  const filteredBrands = Object.keys(brands).filter((key) =>
    brands[key].some((item) => regex.test(item))
  )

  function onSearchClick() {
    setShowInput(true)
  }

  function onCancelClick() {
    setShowInput(false)
  }
  return (
    <div className="flex">
      <div className="flex align-center justify-center">
        <input
          type="text"
          placeholder="Search"
          className="main-search"
          autoFocus
          value={searchQuery}
          onChange={handleInputChange}
        />

        <span className="cancel" onClick={onCancelClick}>
          Cancel
        </span>
      </div>

      <span
        className="search-icon"
        dangerouslySetInnerHTML={{
          __html: getSvg('search'),
        }}
        onClick={onSearchClick}
      />

      {searchQuery && (
        <div className="search-results">
          <h4>Results for "{searchQuery}"</h4>
          <ul>
            {Object.entries(brands).map(
              ([brand, categories]) =>
                categories.filter(
                  (category) =>
                    category
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    brand.toLowerCase().includes(searchQuery.toLowerCase())
                ).length > 0 && (
                  <li key={brand}>
                    <NavLink to={`/${brand}`} onClick={() => onNavClick(brand)}>
                      {brand}
                    </NavLink>
                    <ul>
                      {categories
                        .filter((category) =>
                          category
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((category) => (
                          <li key={category}>
                            <NavLink
                              to={`/${brand}/${category}`}
                              onClick={() => onNavClick(`${brand}/${category}`)}
                            >
                              {category}
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MainFilter
