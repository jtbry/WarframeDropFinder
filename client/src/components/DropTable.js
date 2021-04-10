import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import React from 'react'

export default function DropTable(props) {
  // todo: sort by drop chance, paginate
  const drops = props.drops
  return(
    <TableContainer component={Paper} style={{marginTop: '1rem'}}>
      <h1 style={{paddingLeft: '1rem'}}>Drop Locations</h1>
      <Table aria-label="Component Table">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Drop Chance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drops.map((drop,idx) => {
            return(
              <TableRow key={idx}>
                <TableCell>
                  <a href={`/location/${encodeURI(drop.location)}`}>{drop.location}</a>
                </TableCell>
                <TableCell>{drop.chance * 100 >= 1 ? Math.round(drop.chance * 100) : drop.chance * 100}%</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}