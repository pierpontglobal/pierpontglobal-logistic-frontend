import React, { Component } from "react";
import styled from "styled-components";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import PPGMenuList from "../../ppg-menu-list/PPGMenuList";

const styles = theme => ({
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
  menuList: {
    display: "flex",
    flexDirection: "row"
  }
});

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  width: 100%;
`;

class OrderPrinciopalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  createShipHandler = () => {
    this.props.handleSaveShippment();
  };

  createAttachmentHandler = () => {
    this.props.handleAddAttachment();
  };

  render() {
    const { classes, orderId } = this.props;
    const actionItems = [
      {
        label: "Save shipment",
        handler: this.createShipHandler
      },
      {
        label: "Add attachment",
        handler: this.createAttachmentHandler
      }
    ];

    return (
      <Paper>
        <MainWrapper>
          <div
            style={{
              margin: "15px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ margin: "8px" }}>
                <span style={{ fontWeight: "600" }}>ORDER NUMBER</span>
              </div>
              <div>{orderId}</div>
            </div>
            <div>
              <MenuList className={classes.menuList}>
                <PPGMenuList items={actionItems} openLabel="Actions" />
              </MenuList>
            </div>
          </div>
        </MainWrapper>
      </Paper>
    );
  }
}

export default withStyles(styles)(OrderPrinciopalInfo);
