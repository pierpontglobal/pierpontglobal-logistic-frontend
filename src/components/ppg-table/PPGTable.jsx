import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'scroll',
  },
  table: {
    minWidth: 700,
  },
});

class PPGTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set table default state
      rows: [],
      currentPage: 1,
      pageSizs: 20
    }
  }

  onRowClickEvent = (e, rowId) => {
    if (!!this.props.handleOnRowClick) {
      // Emit this value to the parent component if a handler has been provided.
      this.props.handleOnRowClick(e, rowId);
    }
  }

  render() {
    const { classes, columns, rows } = this.props;
    console.log(columns);

    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
          {columns ? <>
            <TableHead>
              <TableRow>
                  {columns.map((c, index) => {
                    let cWidth = '';
                    if (c.isIcon) cWidth = '10px';
                    return (<TableCell style={{ width: cWidth }} key={index} component="th" scope="row">
                      {c.title}
                    </TableCell>);
                  })}
                </TableRow>
            </TableHead>
          </> : null}
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.id} onClick={event => this.onRowClickEvent(event, row.id)}>
                {row.content.map((rowContent, index) => (
                  <TableCell key={index} component="th" scope="row">
                    {rowContent.text ? rowContent.text : rowContent.icon ? rowContent.icon : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(PPGTable);