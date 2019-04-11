import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import PPGTable from "../../ppg-table/PPGTable";
import Delete from "@material-ui/icons/Delete";
import { IconButton, Button } from "@material-ui/core";

const DropWrapper = styled.div`
  width: 98%;
  margin: 8px;
  padding: 16px;
  background-color: #efefef;
  border: 1px dashed darkblue;
  border-radius: 8px;
  min-height: 45px;
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SelectedFiles = styled.div`
  min-height: 30px;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 16px;
  justify-content: flex-start;
  overflow-x: scroll;
  overflow-y: scroll;
`;

const FileRow = styled.div`
  display: grid;
  grid-template-columns: 8% 24% 24% 24% 24%;
  margin: 12px;
  background: linear-gradient(to right, #f9f9f9, #ededed 75%, #f9f9f9);
`;

const FileRowLabel = styled.div`
  font-weight: 600;
  font-style: italic;
`;

const RowItem = styled.div`
  margin: 8px;
  width: 100%;
  overflow-x: scroll;
`;

const ActionButtonsPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AttachementWrapper = styled.div`
  display: grid;
  grid-template-rows: 5% 15% 70% 10%;
  height: 100%;
  width: 100%;
`;

class AddAttachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: []
    };
  }

  onDropFiles = files => {
    console.log(files);
    const { selectedFiles } = this.state;
    this.setState({
      selectedFiles: [...selectedFiles, ...files]
    });
  };

  deleteFile = fileName => {
    let files = [...this.state.selectedFiles];
    this.setState({
      selectedFiles: files.filter(x => x.name !== fileName)
    });
  };

  makeFileRow = (name, path, size, type) => {
    return (
      <FileRow>
        <RowItem>
          <IconButton onClick={() => this.deleteFile(name)}>
            <Delete />
          </IconButton>
        </RowItem>
        <RowItem>
          <FileRowLabel>Name: </FileRowLabel>
          {name}
        </RowItem>
        <RowItem>
          <FileRowLabel>Path: </FileRowLabel>
          {path}
        </RowItem>
        <RowItem>
          <FileRowLabel>Size: </FileRowLabel>
          {size}
        </RowItem>
        <RowItem>
          <FileRowLabel>Type: </FileRowLabel>
          {type}
        </RowItem>
      </FileRow>
    );
  };

  onCancel = () => {
    this.props.handleCancel();
  };

  onSave = () => {
    const { selectedFiles } = this.state;
    this.props.handleSave(selectedFiles);
  };

  render() {
    const { selectedFiles } = this.state;
    return (
      <AttachementWrapper>
        <div style={{ margin: "16px", color: "darkgray" }}>
          {selectedFiles.length} files selected.
        </div>
        <Dropzone onDrop={acceptedFiles => this.onDropFiles(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <DropWrapper>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </DropWrapper>
          )}
        </Dropzone>
        <SelectedFiles>
          {selectedFiles.length > 0 ? (
            <>
              {selectedFiles.map(file =>
                this.makeFileRow(file.name, file.path, file.size, file.type)
              )}
            </>
          ) : null}
        </SelectedFiles>
        <ActionButtonsPanel>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onCancel}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedFiles.length <= 0}
              onClick={this.onSave}
            >
              Save
            </Button>
          </div>
        </ActionButtonsPanel>
      </AttachementWrapper>
    );
  }
}

export default AddAttachment;
