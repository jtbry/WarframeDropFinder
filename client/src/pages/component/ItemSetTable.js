import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import React from 'react'

export default function ItemSetTable(props) {
  // todo sort by plat price, paginate
  const sets = props.sets
  return(
    <TableContainer component={Paper} style={{marginTop: '1rem'}}>
      <h1 style={{paddingLeft: '1rem'}}>Sets for this Component</h1>
      <Table aria-label="Component Table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Ducats Price</TableCell>
            <TableCell>Plat Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.map((set,idx) => {
            return(
              <TableRow key={idx}>
                <TableCell>
                  <a href={`/item${set.uniqueName}`}>{set.name}</a>
                </TableCell>
                <TableCell>{(set.ducats ? set.ducats : 'N/A')}</TableCell>
                <TableCell>{(set.marketData && !set.marketData.unavailable ? set.marketData.sell.avg : 'N/A')}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}