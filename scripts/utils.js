export default class Utils {
    // =================================== Remove Focus from buttons ===================================
    blurInput() {
        window.onload = function () {
            function blur(){
                this.blur();
            }
    
            for(let i = 0; i < buttons.length; i++){
                buttons[i].addEventListener('click', blur)
            }
        }
    }

    // =================================== Modal Error ===================================
    modalOpen() {
        document.querySelector('.modal-overlay').classList.add('active')
    }

    modalClose() {
        document.querySelector('.modal-overlay').classList.remove('active')
    }
    
    modalCloseConfirm(){
        modalConfirm.addEventListener('click', event => {
            this.modalClose();
        })

        document.addEventListener('keydown', event => {
            const keys = event.key
            if (keys === 'Enter') this.modalClose();
        })
    }
}

// =================================== HTML Variables ===================================
const buttons = document.querySelectorAll('button')
const modalConfirm = document.querySelector('.confirm')
