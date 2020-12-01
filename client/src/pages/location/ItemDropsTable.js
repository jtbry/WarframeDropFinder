import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

// todo: remove duplications, may need to be done in the back-end
// todo: sort by plat value
function sortByChance(items, order) {
  if(order === 'asc') {
    return items.sort((a, b) => {
      const itemA = (a.drops ? a : a.components)
      const itemB = (b.drops ? b : b.components)
      return itemB.drops.chance - itemA.drops.chance
    })
  }
  else {
    return items.sort((a, b) => {
      const itemA = (a.drops ? a : a.components)
      const itemB = (b.drops ? b : b.components)
      return itemA.drops.chance - itemB.drops.chance
    })
  }
}

export default function ItemDropsTable(props) {
  const [page, setPage] = React.useState(0)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const [sort, setSort] = React.useState('asc')
  const changeSort = () => { setSort(sort === 'asc' ? 'desc' : 'asc') }
  return(
    <>
    <TableContainer component={Paper}>
      <Table aria-label="Drop Location Table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Item Plat Value</TableCell>
            <TableCell>Rarity</TableCell>
            <TableCell 
              style={{cursor: 'pointer', userSelect: 'none'}}
              onClick={changeSort}>
              <TableSortLabel active={true} direction={sort} />
              Drop Chance
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.drops && props.drops.length > 0 && sortByChance(props.drops, sort)
            .slice(page * 10, page * 10 + 10)
            .map((item, idx) => {
            const realItem = (item.drops ? item : item.components)
            const itemUrl = (item.drops ? item.uniqueName : item.components.uniqueName)
            return(
              <TableRow key={idx}>
                <TableCell><a href={`/item${itemUrl}`}>{realItem.drops.type}</a></TableCell>
                <TableCell>{realItem.marketData ? realItem.marketData.avg : 'N/A'}</TableCell>
                <TableCell>{realItem.drops.rarity}</TableCell>
                <TableCell>{(realItem.drops.chance * 100).toFixed(2)}%</TableCell>
              </TableRow>
            )
          })
          }
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination 
      rowsPerPageOptions={[10]}
      component="div"
      count={props.drops.length}
      rowsPerPage={10}
      page={page}
      onChangePage={handleChangePage}
    />
    </>
  )
}
