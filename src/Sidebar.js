import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { addAction } from './actions';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';

class Sidebar extends Component {

  state = {
    newActionUserID: this.props.user.id,
    newActionTitle: '',
    newActionStart: moment(),
    newActionEnd: moment(),
    newActionDesc: '',
    newActionImportant: false,
    newActionMeditation: false,
    titleIncomplete: false,
    dateOrderError: false

  }

  handleStartDateChange = (e) => {
    this.setState({
      newActionStart: e._d,
      dateOrderError: false
    })
  }

  handleEndDateChange = (e) => {
    this.setState({
      newActionEnd: e._d,
      dateOrderError: false
    })
  }

  handleTitleChange = (event) => {
    this.setState({
      titleIncomplete: false,
      newActionTitle: event.target.value
    })
  }

  handleDescChange = (event) => {
    this.setState({
      newActionDesc: event.target.value
    })
  }

  handleImportanceChange = (e) => {
    this.setState({
      newActionImportant: !this.state.newActionImportant
    })
  }

  handleNewActionSubmit = (event) => {
    if (this.state.newActionTitle === ''){
      this.setState({
        titleIncomplete: !this.state.titleIncomplete
      })
    }
    if (this.state.newActionStart > this.state.newActionEnd){
      this.setState({
        dateOrderError: true
      })
    }
    if (this.state.newActionTitle !== '' && (this.state.newActionStart <= this.state.newActionEnd))
     {
      this.props.addAction(this.state)
      this.setState({
        newActionTitle: '',
        newActionStart: moment(),
        newActionEnd: moment(),
        newActionDesc: '',
        newActionImportant: false,
        newActionMeditation: false,
        titleIncomplete: false,
        dateOrderError: false
      })
    }
  }

  render(){
    return (
      <div style={{ marginTop: '10%', marginLeft: '10%', fontSize: '10px', height: '487px'}}>
        <div style={{fontSize: '80%', color: 'rgb(89, 95, 104)'}}>
          ADD ACTION | エントリを編集
        </div>
        <br></br>
        <div className="pt-form-group">
          <label className="pt-label" >
            DATE | 開始日
            <span className="pt-text-muted"> (required)</span>
          </label>
          <div className="pt-form-content" >
            <div className="pt-input-group">
            {this.state.dateOrderError ?
              <DatePicker
                  placeholderText={this.state.newActionStart.toString().split('G')[0].slice(0,-9)}
                  className='date-error'
                  calendarClassName='datepicker-content'
                  onChange={this.handleStartDateChange}
              />
            :  <DatePicker
                placeholderText={this.state.newActionStart.toString().split('G')[0].slice(0,-9)}
                className='datepicker'
                calendarClassName='datepicker-content'
                onChange={this.handleStartDateChange}
              />
            }
            </div>
          </div>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" >
          END DATE | 終了日
          </label>
          <div className="pt-input-group">
          {this.state.dateOrderError ?
            <DatePicker
              placeholderText={this.state.newActionEnd.toString().split('G')[0].slice(0,-9)}
              className='date-error'
              calendarClassName='datepicker-content'
              onChange={this.handleEndDateChange}
            />
          :
            <DatePicker
              placeholderText={this.state.newActionEnd.toString().split('G')[0].slice(0,-9)}
              className='datepicker'
              calendarClassName='datepicker-content'
              onChange={this.handleEndDateChange}
            />
          }
          </div>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" >
          TITLE | タイトル
            <span className="pt-text-muted"> (required)</span>
          </label>
          <div className="pt-form-content">
            {this.state.titleIncomplete ?
              <input id="example-form-group-input-a" className="pt-input pt-intent-danger" value={this.state.newActionTitle} style={{width: "90%", height: '25px' }}   dir="auto" onChange={this.handleTitleChange}/>
            : <input id="example-form-group-input-a" className="pt-input" value={this.state.newActionTitle} style={{width: "90%", height: '25px' }}   dir="auto" onChange={this.handleTitleChange}/>
            }
          </div>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" >
            ENTRY | エントリ
          </label>
          <div className="pt-form-content">
            <textarea className="pt-input .modifier" dir="auto" value={this.state.newActionDesc} style={{width: "90%", height: '186px' }}  type="text"  onChange={this.handleDescChange}/>
          </div>
        </div>

        <div className="pt-form-group pt-inline"  style={{marginLeft: '0%', width: '100%', marginTop: '-8%'}}>
          <label className="pt-label" >
            Casual
          </label>
          <div className="pt-form-content">
            <label className="pt-control pt-switch">
              <input id="example-form-group-switch-f" type="checkbox" onChange={this.handleImportanceChange}/>
              <span className="pt-control-indicator"></span>
              Important
            </label>
          </div>
        </div>
        <div className="pt-form-helper-text" style={{fontSize: '12px', marginTop: '-10%'}}>カジュアル / 重要</div>
        <br></br>
        <br></br>
        <div>
          <button  style={{float: 'left', marginRight: '10%', marginTop: '-6%'}} type="button" className="pt-button pt-intent-success pt-small" onClick={this.handleNewActionSubmit}>
            <span className="pt-icon-standard pt-icon-arrow-right pt-align-center"></span>
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.currentUser
  }
}

export default connect(mapStateToProps, { addAction })(Sidebar)
