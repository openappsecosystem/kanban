import React from 'react'
import CardModal from './CardModal'
import Modal from 'react-modal'

const customStyles = {
    overlay : {
       position          : 'fixed',
       top               : 0,
       left              : 0,
       right             : 0,
       bottom            : 0,
       backgroundColor   : 'rgba(0, 0, 0, 0.6)',
       zIndex            : 9999999999,
       height            : '100%',
       justifyContent    : 'center',
       overflow          : 'auto'
     },
     content : {
       width                 : '720px',
       boxShadow             : '0 2px 8px 3px rgba(0,0,0,.3)',
       zIndex                : 9999999999,
       backgroundColor       : '#EDEFF0',
       padding:  0,
       margin:  '40px auto',
       position: 'relative'
   
     }
}

class UModal extends React.Component {
    constructor(props) {
        super(props)
        this.addDescription = this.addDescription.bind(this)
        this.state = {
            modalIsOpen: false,
            date: null,
            focused: false,
            modalSelected: this.props.modalSelected,
            modalDescription: false,
            memberPopup: false,
            processPopup: false
          }
    }

    addDescription () {
        this.setState({
          ...this.state,
          modalDescription: !this.state.modalDescription
        })
      }

    onMember (id) {
        this.setState({
          ...this.state,
          processPopup: false,
          deletePopup: false,
          memberPopup: !this.state.memberPopup
        })
      }
    
      onProcess (id) {
        this.setState({
          ...this.state,
          memberPopup: false,
          deletePopup: false,
          processPopup: !this.state.processPopup
        })
      }
    
      onDelete (id) {
        this.setState({
          ...this.state,
          memberPopup: false,
          processPopup: false,
          deletePopup: !this.state.deletePopup
        })
      }

      render () {
        const {modalSelected, date, memberPopup, modalDescription, deletePopup, processPopup} = this.state
          return (
            <Modal
            isOpen={this.props.modalIsOpen}
            onRequestClose={this.props.closeModal}
            contentLabel='CardModal'
            style={customStyles}
            >
              <CardModal onMember={this.onMember.bind(this)} onProcess={this.onProcess.bind(this)} onDelete={this.onDelete.bind(this)} memberPopup={memberPopup} processPopup={processPopup} date={date} deletePopup={deletePopup} modalIsOpen={this.props.modalIsOpen} closeModal={this.props.closeModal} modalSelected={this.props.modalSelected} modalDescription={modalDescription} addDescription={this.addDescription.bind(this)} />
            </Modal>
          )
      }
}

export default UModal