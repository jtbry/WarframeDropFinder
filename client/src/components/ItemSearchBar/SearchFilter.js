import React from 'react'

export default function SearchFilter(props) {
  return(
    <h1 onClick={() => {
      props.updateFilters({active: true})
    }}>Search Filter</h1>
  )
}
