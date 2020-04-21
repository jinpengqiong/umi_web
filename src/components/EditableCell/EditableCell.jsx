import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, editingKey: '',location:'' };
    this.columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Client ID',
        dataIndex: 'clientId',
        key: 'clientId',
      },
      {
        title: 'Client Key',
        dataIndex: 'clientKey',
        key: 'clientKey',
      },
      {
        title: 'Client Value',
        key: 'clientValue',
        dataIndex: 'clientValue',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          console.log('record', record);
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Popconfirm title="Sure to save?" onConfirm={() => this.save(form, record.key)}>
                    <a style={{ marginRight: 8 }}>Save</a>
                  </Popconfirm>
                )}
              </EditableContext.Consumer>

              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              Edit
            </a>
          );
        },
      },
    ];
  }
  componentDidMount() {
    if (this.props) {
      const data = this.props.tableData
        ? this.props.tableData.map((item, i) => {
            item.key = i;
            return item;
          })
        : null;

      this.setState({
        data,
        location:this.props.location,
      });
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.tableData !== this.state.tableData){
      const data = nextProps.tableData? nextProps.tableData.map(
        (item, index) => {
        item.key = index;
        return item
      }) : null
      this.setState({
        data,
        location: nextProps.location,
      });
    }
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save = (form, key) => {

    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];

      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }

      this.props.dispatch({
        type: 'config/updateTableData',
        payload: {
          clientValue: newData[key].clientValue,
          id: newData[key].id,
          location:this.props.location
        },
      });
    });
  };

  edit(key) {
    console.log('key', key)
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

export const EditableFormTable = Form.create()(EditableTable);
