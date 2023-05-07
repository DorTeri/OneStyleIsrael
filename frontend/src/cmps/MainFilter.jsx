import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getSvg } from '../services/svg.service'
import { NavLink, useNavigate } from 'react-router-dom'

function MainFilter({ onNavClick, onCancelClick }) {
  const brands = useSelector((storeState) => storeState.productsModule.brands)
  console.log(brands)

  const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const boldify = (text) => {
    if (searchQuery !== '') {
      const regex = new RegExp(searchQuery, 'gi')
      return text.replace(regex, (match) => `<b>${match}</b>`)
    } else {
      return text
    }
  }

  return (
    <>
    <div className="main-filter flex column">
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

      {searchQuery !== '' && (
        <div className="search-results">
          <h4>Results for "{searchQuery}"</h4>
          <section className="results">
            {Object.entries(brands).map(
              ([brand, categories]) =>
                categories.filter(
                  (category) =>
                    category
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    brand.toLowerCase().includes(searchQuery.toLowerCase())
                ).length > 0 && (
                  <div key={brand}>
                    <NavLink to={`/${brand}`} onClick={() => onNavClick(brand)}>
                      <span
                        dangerouslySetInnerHTML={{ __html: boldify(brand) }}
                      />
                    </NavLink>
                    <span className="brand-label"> Brand</span>
                    <section>
                      {categories
                        .filter((category) =>
                          category
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((category) => (
                          <div key={category}>
                            <NavLink
                              to={`/${brand}/${category}`}
                              onClick={() => onNavClick(`${brand}/${category}`)}
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: boldify(category),
                                }}
                              />
                            </NavLink>
                          </div>
                        ))}
                    </section>
                  </div>
                )
            )}
          </section>
        </div>
      )}
    </div>
    {/* <div className='modal-background'></div> */}
     </>
  )
}

export default MainFilter
