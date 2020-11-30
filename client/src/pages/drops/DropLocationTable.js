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

function sortByChance(drops, order) {
  if(order === 'asc') return drops.sort((a, b) => b.chance - a.chance)
  else return drops.sort((a, b) => a.chance - b.chance)
}

// todo: remove duplications, may need to be done in the back-end
export default function DropLocationTable(props) {
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
            <TableCell>Location</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Rarity</TableCell>
            <TableCell 
              style={{cursor: 'pointer', userSelect: 'none'}}
              onClick={changeSort}>
              <TableSortLabel active={true} direction={sort} />
              Chance
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortByChance(props.drops, sort)
          .slice(page * 10, page * 10 + 10)
          .map((drop, idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">
                <a href={`/location/${encodeURI(drop.location)}`}>{drop.location}</a>
              </TableCell>
              <TableCell>{drop.type}</TableCell>
              <TableCell>{drop.rarity}</TableCell>
              <TableCell>
                {(drop.chance * 100).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
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
