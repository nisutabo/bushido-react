import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { addMeditation } from './actions';
import { editAction } from './actions';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, Button, Icon, Overlay, Classes, EditableText, Popover, Elevation } from '@blueprintjs/core';

BigCalendar.momentLocalizer(moment);




class Calendar extends Component {

  state = {
    entrySelected: false,
    selectedEntryID: null,
    selectedEntryTitle: '',
    selectedEntryDesc: '',
    selectedEntryStart: '',
    selectedEntryEnd: '',
    selectedEntryMeditation: Boolean,
    selectedEntryImportant: Boolean,
    isOverlayOpen: false,

    formOpen: false,
    newMeditationUserID: this.props.user.id,
    newMeditationTitle: '',
    newMeditationStart: moment(),
    newMeditationEnd: moment(),
    newMeditationDesc: '',
    newMeditation: true,
    newMeditationImportant: false,
    titleIncomplete: false,
    descIncomplete: false,

    toShow: 'all'



  }

  showEvent = (event) => {

      this.setState({
        entrySelected: true,
        selectedEntryID: event.id,
        selectedEntryTitle: event.title,
        selectedEntryDesc: event.desc,
        selectedEntryStart: event.startDate,
        selectedEntryEnd: event.endDate,
        selectedEntryMeditation: event.meditation,
        selectedEntryImportant: event.important
      })

  }

  showForm = (slotInfo) => {
      this.setState({
        formOpen: true,
        newMeditationStart: slotInfo.start,
        newMeditationEnd: slotInfo.end

      })

  }

  toggleEditForm = () => {
    this.setState({
      isOverlayOpen: !this.state.isOverlayOpen
    })
  }

  toggleAddForm = () => {
    this.setState({
      formOpen: !this.state.formOpen,
      titleIncomplete: false,
      descIncomplete: false
    })
  }

  handleTitleChange = (event) => {
    this.setState({
      selectedEntryTitle: event
    })
  }

  handleDescChange = (event) => {
    this.setState({
      selectedEntryDesc: event
    })
  }

  handleEditSubmit = (event) => {
    this.props.editAction(this.state.selectedEntryID, this.state.selectedEntryTitle, this.state.selectedEntryDesc)
    this.toggleEditForm()
  }

  handleNewMeditationTitle = (event) => {
    this.setState({
      titleIncomplete: false,
      newMeditationTitle: event.target.value
    })
  }

  handleNewMeditationDesc = (event) => {
    this.setState({
      descIncomplete: false,
      newMeditationDesc: event.target.value
    })
  }

  handleNewMeditationImportant = (event) => {
    this.setState({
      newMeditationImportant: !this.state.newMeditationImportant
    })
  }

  handleNewMeditationSubmit = (event) => {
    if (this.state.newMeditationTitle === ''){
      this.setState({
        titleIncomplete: !this.state.titleIncomplete
      })
    }
    if (this.state.newMeditationDesc === ''){
      this.setState({
        descIncomplete: !this.state.descIncomplete
      })
    }
    if (this.state.newMeditationTitle !== '' && this.state.newMeditationDesc !== ''){

      this.props.addMeditation(this.state);
      this.setState({
        newMeditationTitle: '',
        newMeditationStart: moment(),
        newMeditationEnd: moment(),
        newMeditationDesc: '',
        newMeditationImportant: false,
      })
      this.toggleAddForm()
    }
  }

  eventStyling = (event) => {

    let style = {
        backgroundColor: 'lightgrey',
        borderRadius: '0px',
        opacity: 1,
        color: 'black',
        fontSize: '12px',
        border: '0px',
        display: 'block'
    };

    if (event.meditation && event.important){
        style.backgroundColor = "lightgreen"
      }
      else if (event.meditation && event.important !== true) {
        style.backgroundColor = 'rgb(228, 249, 214)'
      }
      else if (event.meditation !== true && event.important !== true) {
        style.backgroundColor = 'rgb(249, 224, 244)'
      }

    return {
        style: style
    };
  }

  getEventColor = () => {
    let result = ''
    if (this.state.selectedEntryMeditation && this.state.selectedEntryImportant){
      result = "lightgreen"
    }
    else if (this.state.selectedEntryMeditation && this.state.selectedEntryImportant !== true){
      result = 'rgb(228, 249, 214)'
    }
    else if (this.state.selectedEntryMeditation !== true && this.state.selectedEntryImportant !== true){
      result = 'rgb(249, 224, 244)'
    }
    else {
      result = 'lightgrey'
    }
    return result
  }

  entriesToShow = () => {
    if (this.state.toShow === 'all'){
      return this.props.entries
    }
    else if (this.state.toShow === 'Important Meditations') {
      return this.props.entries.filter(entry => entry.meditation === true && entry.important === true)
    }
    else if (this.state.toShow === 'Casual Meditations') {
      return this.props.entries.filter(entry => entry.meditation === true && entry.important === false)
    }
    else if (this.state.toShow === 'Casual Actions') {
      return this.props.entries.filter(entry => entry.meditation === false && entry.important === false)
    }
    else {
      return this.props.entries.filter(entry => entry.meditation === false && entry.important === true)
    }
  }

  showImportantMeditations = () => {
    this.setState({
      toShow: 'Important Meditations'
    })
  }

  showCasualMeditations = () => {
    this.setState({
      toShow: 'Casual Meditations'
    })
  }

  showCasualActions = () => {
    this.setState({
      toShow: 'Casual Actions'
    })
  }

  showImportantActions = () => {
    this.setState({
      toShow: 'Important Actions'
    })
  }

  showAll = () => {
    this.setState({
      toShow: 'all'
    })
  }


  render(){
    const importantMeditation = () => {
      return (
        <Card elevation={Elevation.ZERO} className='keycard'>
          IMPORTANT MEDITATIONS
          <br></br>
          重要な瞑想
        </Card>
      )
    }
    const casualMeditation = () => {
      return (
        <Card elevation={Elevation.ZERO} className='keycard'>
          CASUAL MEDITATIONS
          <br></br>
          カジュアルな瞑想
        </Card>
      )
    }

    const all = () => {
      return (
        <Card elevation={Elevation.ZERO} className='keycard'>
          すべて
        </Card>
      )
    }

    const importantAction = () => {
      return (
        <Card elevation={Elevation.ZERO} className='keycard'>
          IMPORTANT ACTIONS
          <br></br>
          重要な行動
        </Card>
      )
    }
    const casualAction = () => {
      return (
        <Card elevation={Elevation.ZERO} className='keycard'>
          CASUAL ACTIONS
          <br></br>
          カジュアルアクション
        </Card>
      )
    }

    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

    const entries = this.entriesToShow().map(entry => { return {
      id: entry.id,
      title: entry.title,
      startDate: new Date(entry.start_date),
      endDate: new Date(entry.end_date),
      desc: entry.entry,
      meditation: entry.meditation,
      important: entry.important
    }})

    return (

      <div>

          <div className='column column-7'>
            <BigCalendar
              selectable
              events={entries}
              views={allViews}
              step={60}
              style={{marginTop: '1%', height: "500px", width: '95%'}}
              showMultiDayTimes
              defaultDate={new Date(2018, 5, 1)}
              startAccessor='startDate'
              endAccessor='endDate'
              eventPropGetter={(this.eventStyling)}
              onSelectEvent={event => this.showEvent(event)}
              onSelectSlot={slotInfo => this.showForm(slotInfo)}
              />
              <div style={{textAlign: 'center', marginTop: '2%'}}>
                <Popover interactionKind='hover' minimal hoverOpenDelay={0} hoverCloseDelay={0} content={importantMeditation()}>
                  <Button minimal small={true} onClick={this.showImportantMeditations}>
                    <Icon icon='symbol-circle' iconSize={15} color="lightgreen" />
                  </Button>
                </Popover>
                <Popover interactionKind='hover' minimal hoverOpenDelay={0} hoverCloseDelay={0} content={casualMeditation()}>
                  <Button minimal small={true} onClick={this.showCasualMeditations}>
                    <Icon icon='symbol-circle' iconSize={15} color='rgb(228, 249, 214)' />
                  </Button>
                </Popover>
                <Popover interactionKind='hover' minimal hoverOpenDelay={0} hoverCloseDelay={0} content={casualAction()}>
                  <Button minimal small={true} onClick={this.showCasualActions}>
                    <Icon icon='symbol-circle' iconSize={15} color='rgb(249, 224, 244)' />
                  </Button>
                </Popover>
                <Popover interactionKind='hover' minimal hoverOpenDelay={0} hoverCloseDelay={0} content={importantAction()}>
                  <Button minimal small={true} onClick={this.showImportantActions}>
                    <Icon icon='symbol-circle' iconSize={15} color='lightgrey' />
                  </Button>
                </Popover>
                <Popover interactionKind='hover' minimal hoverOpenDelay={0} hoverCloseDelay={0} content={all()}>
                  <Button minimal small={true} onClick={this.showAll} style={{fontSize: '9px'}}>
                    All
                  </Button>
                </Popover>
              </div>
          </div>
          <div>
          {this.state.formOpen ?
             <Overlay  isOpen={this.state.formOpen} className={Classes.OVERLAY_SCROLL_CONTAINER} transitionDuration={0} canEscapeKeyClose={true} canOutsideClickClose={true}>
              <Card style={{position: 'absolute', left: '37%', top: '5%', backgroundColor: 'white', height: '560px', width: '23%', borderRadius: '0%'}}>
                <div style={{float: 'right', marginTop: '-6%', marginRight: '-7%'}}>
                  <Button minimal onClick={this.toggleAddForm}>
                    <Icon icon='cross' color='black' iconSize={12} />
                  </Button>
                </div>
                <div style={{fontSize: '60%', color: 'rgb(89, 95, 104)'}}>
                  ADD MEDITATION | エントリを編集
                </div>
                <div style={{ marginTop: '5%', marginLeft: '0%'}}>
                <h2>
                  DATE | 瞑想日: {this.state.newMeditationStart.toString().split('G')[0].slice(0,15)}
                </h2>
                <div style={{fontSize: '80%', fontFamily: 'Helvetica-Light'}}>
                  <div className="pt-form-group">
                      <label className="pt-label" >
                        TITLE | タイトル
                        <span> (required)</span>
                      </label>
                      <div className="pt-form-content" >
                      {this.state.titleIncomplete ?
                        <input id="example-form-group-input-a" className="pt-input pt-intent-danger" style={{width: "100%", height: '25px' }} placeholder="" type="text" dir="auto" onChange={this.handleNewMeditationTitle}/>
                      : <input id="example-form-group-input-a" className="pt-input" style={{width: "100%", height: '25px' }} placeholder="" type="text" dir="auto" onChange={this.handleNewMeditationTitle}/>
                      }
                      </div>
                    </div>
                    <div className="pt-form-group">
                      <label className="pt-label" >
                        ENTRY | エントリ
                        <span> (required)</span>
                      </label>
                      <div className="pt-form-content">
                      {this.state.descIncomplete ?
                        <textarea className="pt-input pt-intent-danger" dir="auto" style={{width: "100%", height: '250px' }}  type="text"  onChange={this.handleNewMeditationDesc}/>
                      : <textarea className="pt-input .modifier" dir="auto" style={{width: "100%", height: '250px' }}  type="text"  onChange={this.handleNewMeditationDesc}/>
                      }
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="pt-form-group pt-inline"  style={{marginLeft: '0%', width: '100%', marginTop: '-10%', fontSize: '80%', fontFamily: 'Helvetica-Light'}}>
                    <label className="pt-label" >
                      Casual
                    </label>
                    <div className="pt-form-content">
                      <label className="pt-control pt-switch">
                        <input id="example-form-group-switch-f" type="checkbox" onChange={this.handleNewMeditationImportant}/>
                        <span className="pt-control-indicator"></span>
                        Important
                      </label>
                    </div>
                  </div>
                  <div className="pt-form-helper-text" style={{fontSize: '80%', marginTop: '-5%', fontFamily: 'Helvetica-Light'}}>カジュアル / 重要</div>
                  <br></br>
                  <div>
                  <button  style={{float: 'left', marginRight: '4%'}} type="button" className="pt-button pt-intent-success pt-small" onClick={this.handleNewMeditationSubmit}>
                    <span className="pt-icon-standard pt-icon-arrow-right pt-align-center"></span>
                  </button>
                  </div>
                </div>
              </Card>
            </Overlay>
            :
            null
          }
          </div>
          {this.state.entrySelected === false ?
          <div className='column column-3'>
              <div className='placeholder'>
              </div>
              <div className='placeholder-text'>
                調停に入る
                <div className='small-font'>
                  View Entries Here
                </div>
              </div>
            </div>
          :
          <div className='column column-3' style={{ marginTop: '1%', width: '20%' }}>
            <Card interactive={true} onClick={this.toggleEditForm} style={{position: 'relative', backgroundColor: 'rgb(252, 252, 252)', borderRadius: '0%', height: '494px'}}>
              <h2>
                DATE | 日付: {this.state.selectedEntryStart.toString().split('G')[0].slice(0,15)}
              </h2>
              <h5 style={{ textTransform: 'uppercase' }}>{this.state.selectedEntryTitle} <span><Icon icon='symbol-circle' iconSize={15} color={this.getEventColor()} /></span></h5>

              <p>{this.state.selectedEntryDesc}</p>
              <Icon icon="select"  style={{float: 'left', position: 'absolute', bottom: '15px', right: '15px'}}/>
            </Card>
            <Overlay  isOpen={this.state.isOverlayOpen} className={Classes.OVERLAY_SCROLL_CONTAINER} transitionDuration={0} canEscapeKeyClose={true} canOutsideClickClose={true}>
              <Card style={{position: 'absolute', left: '37%', top: '5%', backgroundColor: 'rgb(247, 248, 249)', height: '560px', width: '23%', borderRadius: '0%'}}>
                <div style={{float: 'right', marginTop: '-6%', marginRight: '-7%'}}>
                  <Button minimal onClick={this.toggleEditForm}>
                    <Icon icon='cross' color='black' iconSize={12} />
                  </Button>
                </div>
                <div style={{fontSize: '60%', color: 'rgb(89, 95, 104)'}}>
                  EDIT ENTRY | エントリを編集
                </div>
                <br></br>

                <h5 style={{textTransform: 'uppercase'}}>
                  <EditableText
                    defaultValue={this.state.selectedEntryTitle}
                    placeholder={this.state.selectedEntryTitle}
                    multiline={true}
                    onChange={this.handleTitleChange}
                  />

                </h5>

                <div className='overlayEdit'>
                <EditableText
                  defaultValue={this.state.selectedEntryDesc}
                  placeholder={this.state.selectedEntryDesc}
                  multiline={true}
                  onChange={this.handleDescChange}
                />
                </div>

                <br></br>
                <button  style={{float: 'left', marginRight: '2%'}} type="button" className="pt-button pt-intent-success pt-small" onClick={this.handleEditSubmit}>
                  <span className="pt-icon-standard pt-icon-arrow-right pt-align-center"></span>
                </button>
              </Card>
            </Overlay>
          </div>
          }


      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    entries: state.entries,
    user: state.currentUser
  }
}

export default connect(mapStateToProps,  { editAction, addMeditation })(Calendar);
