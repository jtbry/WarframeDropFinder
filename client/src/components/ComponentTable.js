import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import React from 'react'

export default function ComponentTable(props) {
  const components = props.components
  return(
    <TableContainer component={Paper} style={{marginTop: '1rem'}}>
      <h1 style={{paddingLeft: '1rem'}}>Item Components</h1>
      <Table aria-label="Component Table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Ducats Price</TableCell>
            <TableCell>Plat Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {components.map((component,idx) => {
            return(
              <TableRow key={idx}>
                <TableCell>
                  <a href={`/component${component.uniqueName}`}>{component.name}</a>
                </TableCell>
                <TableCell>{component.itemCount}</TableCell>
                <TableCell>{(component.ducats ? component.ducats : 'N/A')}</TableCell>
                <TableCell>{(component.marketData ? component.marketData.sell.avg : 'N/A')}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}