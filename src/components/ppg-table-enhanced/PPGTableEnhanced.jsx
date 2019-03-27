import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'order-number', numeric: true, disablePadding: true, label: 'Order number' },
  { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
  { id: 'destination', numeric: false, disablePadding: true, label: 'Destination' },
  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'origin', numeric: false, disablePadding: true, label: 'Origin name' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Orders from Pierpont Global
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class PPGEnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: [
        {
          orderNumber: 8787,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        },
        {
          orderNumber: 999,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        },
        {
          orderNumber: 993,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        },
        {
          orderNumber: 585,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        },
        {
          orderNumber: 73658,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        },
        {
          orderNumber: 948,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        },
        {
          orderNumber: 90,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        },
        {
          orderNumber: 2838,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        },
        {
          orderNumber: 4592,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        },
        {
          orderNumber: 3409,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        },
        {
          orderNumber: 1298,
          status: 'new',
          destination: 'Dominican Republic Port',
          date: new Date().toDateString('m-d-Y h:i:s'),
          originName: 'Dealer Barauto'
        }
      ],
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (e, rowId) => {
    if (!!this.props.handleOnRowClick) {
      // Emit this value to the parent component if a handler has been provided.
      this.props.handleOnRowClick(e, rowId);
    }
  };

  handleChangePage = (event, page) => {
    console.log(page);
  };

  handleChangeRowsPerPage = event => {
    console.log(event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.orderNumber)}
                      tabIndex={-1}
                      key={n.orderNumber}

                    >
                      <TableCell padding="checkbox">
                        <RemoveRedEye />
                      </TableCell>
                      <TableCell padding='none' component="th" scope="row" padding="none">
                        {n.orderNumber}
                      </TableCell>
                      <TableCell padding='none'align="left">{n.status}</TableCell>
                      <TableCell padding='none' align="left">{n.destination}</TableCell>
                      <TableCell padding='none' align="left">{n.date}</TableCell>
                      <TableCell padding='none' align="left">{n.originName}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[20, 100, 200]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

PPGEnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PPGEnhancedTable);
