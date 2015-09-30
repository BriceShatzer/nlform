/**
 *
 * Derived from Codrops NaturalLanguageForm
 * https://github.com/codrops/NaturalLanguageForm
 * http://www.codrops.com
 *
 */
;( function( window ) {
    
    'use strict';

    var document = window.document;

    if (!String.prototype.trim) {
        String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
    }

    function NLForm( el ) {    
        this.el = el;
        this.overlay = this.el.querySelector( '.nl-overlay' );
        this.fields = [];
        this.fldOpen = -1;
        this._init();
    }

    NLForm.prototype = {
        _init : function() {
            var self = this;
            Array.prototype.slice.call( this.el.querySelectorAll( 'select' ) ).forEach( function( el, i ) {
                self.fldOpen++;
                self.fields.push( new NLField( self, el, 'dropdown', self.fldOpen ) );
            } );

            Array.prototype.slice.call( this.el.querySelectorAll( 'input.modal' ) ).forEach( function( el, i ) {
                self.fldOpen++;
                self.fields.push( new NLField( self, el, 'input', self.fldOpen ) );
            } );

            Array.prototype.slice.call( this.el.querySelectorAll( 'input.income' ) ).forEach( function( el, i ) {
                self.fldOpen++;
                self.fields.push( new NLField( self, el, 'income', self.fldOpen ) );
            } );            

            this.overlay.addEventListener( 'click', function(ev) { self._closeFlds(); } );
            this.overlay.addEventListener( 'touchstart', function(ev) { self._closeFlds(); } );
        },
        _closeFlds : function() {
            if( this.fldOpen !== -1 ) {
                this.fields[ this.fldOpen ].close();
            }
        }
    };

    function NLField( form, el, type, idx ) {
        this.form = form;
        this.elOriginal = el;
        this.pos = idx;
        this.type = type;
        this._create();
        this._initEvents();
    }

    NLField.prototype = {
        _create : function() {
            if( this.type === 'dropdown' ) {
                this._createDropDown();    
            }
/*==*/
            else if( this.type === 'input' ) {
                this._createInput();    
            }

            else if( this.type === 'income' ) {
                this._createIncome();    
            }
/*==*/
        },
        _createDropDown : function() {
            var self = this;
            this.fld = document.createElement( 'div' );
            this.fld.className = 'nl-field nl-dd';
            this.toggle = document.createElement( 'a' );
            this.toggle.innerHTML = this.elOriginal.options[ this.elOriginal.selectedIndex ].innerHTML;
            this.toggle.className = 'nl-field-toggle';
            this.optionsList = document.createElement( 'ul' );
            var ihtml = '';
            Array.prototype.slice.call( this.elOriginal.querySelectorAll( 'option' ) ).forEach( function( el, i ) {
                ihtml += self.elOriginal.selectedIndex === i ? '<li class="nl-dd-checked">' + el.innerHTML + '</li>' : '<li>' + el.innerHTML + '</li>';
                // selected index value
                if( self.elOriginal.selectedIndex === i ) {
                    self.selectedIdx = i;
                }
            } );
            this.optionsList.innerHTML = ihtml;
            this.fld.appendChild( this.toggle );
            this.fld.appendChild( this.optionsList );
            this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
            this.elOriginal.style.display = 'none';
        },
/*==*/
        _createInput : function() {
            var self = this;
            this.fld = document.createElement( 'div' );
            this.fld.className = 'nl-field nl-ti-text';
            this.toggle = document.createElement( 'a' );
            this.toggle.innerHTML = this.elOriginal.getAttribute('value')? this.elOriginal.getAttribute('value'): this.elOriginal.getAttribute('placeholder');
            this.toggle.className = 'nl-field-toggle';
            this.optionsList = document.createElement( 'ul' );
            this.getinput = document.createElement( 'input' );
            this.getinput.setAttribute( 'type', this.elOriginal.getAttribute('type')? this.elOriginal.getAttribute('type'): '');
            this.getinput.setAttribute( 'placeholder', this.elOriginal.getAttribute( 'placeholder' ) );
            this.getinput.setAttribute( 'value', this.elOriginal.getAttribute('value')? this.elOriginal.getAttribute('value'): '');
            this.getinputWrapper = document.createElement( 'li' );
            this.getinputWrapper.className = 'nl-ti-input';
            this.inputsubmit = document.createElement( 'button' );
            this.inputsubmit.className = 'nl-field-go';
            this.inputsubmit.innerHTML = 'Go';
            this.getinputWrapper.appendChild( this.getinput );
            this.getinputWrapper.appendChild( this.inputsubmit );
            this.example = document.createElement( 'li' );
            this.example.className = 'nl-ti-example';
            this.example.innerHTML = this.elOriginal.getAttribute( 'data-subline' );
            this.optionsList.appendChild( this.getinputWrapper );
            this.optionsList.appendChild( this.example );
            this.fld.appendChild( this.toggle );
            this.fld.appendChild( this.optionsList );
            this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
            this.elOriginal.style.display = 'none';
        },
        _createIncome : function() {
            var self = this;
            this.fld = document.createElement( 'div' );
            this.fld.className = 'nl-field nl-ti-text';
            this.toggle = document.createElement( 'a' );
            this.toggle.className = 'nl-field-toggle';
            this.toggle.id = this.elOriginal.id+"-toggle";
            if(this.elOriginal.getAttribute('value')){                
                this.toggle.innerHTML = this.elOriginal.getAttribute('value');
            } else { 
                this.toggle.className += ' placeholder';
                this.toggle.innerHTML = this.elOriginal.getAttribute('placeholder');
            }
            //this.toggle.innerHTML = this.elOriginal.getAttribute('value')? this.elOriginal.getAttribute('value'): this.elOriginal.getAttribute('placeholder');
            //this.toggle.className = 'nl-field-toggle';
            this.optionsList = document.createElement( 'ul' );
            this.getinput = document.createElement( 'input' );
            this.getinput.setAttribute( 'type', 'text');
            this.getinput.setAttribute( 'placeholder', this.elOriginal.getAttribute( 'placeholder' ) );
            this.getinput.setAttribute( 'value', this.elOriginal.getAttribute('value')? this.elOriginal.getAttribute('value'): '');
            
            this.getinputWrapper = document.createElement( 'li' );
            this.getinputWrapper.className = 'nl-ti-input';
            this.inputsubmit = document.createElement( 'button' );
            this.inputsubmit.className = 'nl-field-go';
            this.inputsubmit.innerHTML = 'Go';
            this.getinputWrapper.appendChild( this.getinput );
            this.getinputWrapper.appendChild( this.inputsubmit );
            this.example = document.createElement( 'li' );
            this.example.className = 'nl-ti-example';
            this.example.innerHTML = this.elOriginal.getAttribute( 'data-subline' );
            this.optionsList.appendChild( this.getinputWrapper );
            this.optionsList.appendChild( this.example );
            this.fld.appendChild( this.toggle );
            this.fld.appendChild( this.optionsList );
            this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
            this.elOriginal.style.display = 'none';            
        },
/*==*/
        _initEvents : function() {
            var self = this;
            this.toggle.addEventListener( 'click', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );
            this.toggle.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );

            if( this.type === 'dropdown' ) {
                var opts = Array.prototype.slice.call( this.optionsList.querySelectorAll( 'li' ) );
                opts.forEach( function( el, i ) {
                    el.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
                    el.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
                } );
            }
/*==*/
            else if( this.type === 'input' || 'income' ) {
                this.getinput.addEventListener( 'keydown', function( ev ) {
                    if ( ev.keyCode == 13 ) {
                        self.close();
                    }
                } );
                this.inputsubmit.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close(); } );
                this.inputsubmit.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close(); } );
            }
/*==*/

        },
        _open : function() {
            if( this.open ) {
                return false;
            }
            this.open = true;
            this.form.fldOpen = this.pos;
            var self = this;
            this.fld.className += ' nl-field-open';
        },
        close : function( opt, idx ) {
            if( !this.open ) {
                return false;
            }
            this.open = false;
            this.form.fldOpen = -1;
            this.fld.className = this.fld.className.replace(/\b nl-field-open\b/,'');

            if( this.type === 'dropdown' ) {
                if( opt ) {
                    // remove class nl-dd-checked from previous option
                    var selectedopt = this.optionsList.children[ this.selectedIdx ];
                    selectedopt.className = '';
                    opt.className = 'nl-dd-checked';
                    this.toggle.innerHTML = opt.innerHTML;
                    // update selected index value
                    this.selectedIdx = idx;
                    // update original select element´s value
                    this.elOriginal.value = this.elOriginal.children[ this.selectedIdx ].value;
                }
            }
            /*==*/
            else if( this.type === 'input' ) {
                this.getinput.blur();
                this.toggle.innerHTML = this.getinput.value.trim() !== '' ? this.getinput.value : this.getinput.getAttribute( 'placeholder' );
                this.elOriginal.value = this.getinput.value;
            }
            else if( this.type === 'income' ) {
                var displayedIncome;
                var n = this.getinput.value.trim().replace(/(,|\$)/, '');
                this.getinput.blur();
                this.toggle.className = 'nl-field-toggle';
                if( !isNaN(parseFloat(n)) && isFinite(n) ){                        
                    displayedIncome = parseInt(n).toLocaleString('en-US',{style: 'currency', currency: 'USD'});
                } else {
                    this.toggle.className += ' placeholder';
                    displayedIncome = this.getinput.getAttribute( 'placeholder' );
                }
                this.toggle.innerHTML = displayedIncome;
                this.elOriginal.value = this.getinput.value;
            }            
            /*==*/
        }
    };

    // add to global namespace
    window.NLForm = NLForm;

} )( window );



function validateInput(element_id){
    var el       = document.getElementById(element_id);
    var toggleEl = { status: false, element: '' };

    if(document.getElementById(element_id+'-toggle')){ 
        toggleEl.status  = true;
        toggleEl.element = document.getElementById(element_id+'-toggle');
    }

    function _setInvalid(){
        if(toggle.status){ toggleEl.element.className+=" invalid" };
        el.className+=" invalid"; 
    }
    

    function _removeInvalid () {
        var classArray = el.className.split(' ');
        el.className = classArray.splice(classArray.indexOf("invalid"),1);
        
        if(toggle.status){ 
            var ToggleClassArray = toggleEl.className.split(' ');
            toggleEl.className = ToggleClassArray.splice(ToggleClassArray.indexOf("invalid"),1);            
        };    
    }



    switch (el.getAttribute('type')) {
        case 'number':    
            if( !el.value || 
                isNaN(el.value) ||
                el.value < el.getAttribute('min') && el.value > el.getAttribute('max') ){
                    el.className+=" invalid"; 
            } 
            break;

        case 'text':
            if( !el.value ||
                el.getAttribute('minlength') && el.value.length < el.getAttribute('minlength') || 
                el.getAttribute('maxlength') && el.value.length > el.getAttribute('maxlength') ){
                    el.className+=" invalid"; 
                } 
            break;
        
    } //else if(el.getAttribute('type') === 'text')) 
}

function getCityState(){
    var request = new XMLHttpRequest();
    var url     = "http://api.zippopotam.us/us/"+document.getElementById('address_1_zip').value;

    request.open("GET", url, true);
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            var locationInfo = JSON.parse(request.responseText).places[0];
            document.getElementById('address_1_state').value = locationInfo["state abbreviation"];
            document.getElementById('address_1_city').value  = locationInfo["place name"];
        };
    };

    request.send();
}

function getYear () {
    function value(element_id){ return document.getElementById('element_id').value }
    var userAge   = value('age_value');
    var userMonth = value('insured_1_dobMM');
    var userDay   = value('insured_1_dobDD');
    var today     = new Date();
    var userYear  = today.getFullYear() - ( today.getMonth() < userMonth-1  || (today.getMonth() == userMonth-1 && today.getDate() > userDay) ? userAge+1 : userAge );
    
    document.getElementById('insured_1_dobYYYY').value = userYear;    
}

(function(){

/* === text input auto sizing === */
    function autoInputSizing(element_id){
        document.getElementById(element_id).onkeyup = function(){            
            this.style.width = this.value.length*.51 +"em";
        }
    }
    autoInputSizing('first_name');
    autoInputSizing('last_name');
    autoInputSizing('email');

/* === phone number masking === */
    document.getElementById('phone').onkeyup = function(){
        this.value = this.value.replace(/\D/g, ''); // prevent non-digits

        this.value = this.value.replace(/(\d{3})(\d)/, '($1)$2')
            .replace(/^(\(\d{3}\)\d{3})(\d)/, '$1-$2'); // apply proper formatting 

        if (this.value.length > 13) { // ensure proper length
            this.value = this.value.slice(0, -1);
            return;
        }

    };


/* === "NEXT" Button behavior === */
    var nextStepButton = document.getElementById('next-step');
    var func = function(){
        var bottom = document.getElementById('contact-info');
        
        nextStepButton.style.display = 'none';
        bottom.style.maxHeight = bottom.scrollHeight+'px';
    }

    if(window.addEventListener){ // modern browsers including IE9+
        nextStepButton.addEventListener('click', func, false);
    } else if(window.attachEvent) { // IE8 and below
        nextStepButton.attachEvent('onclick', func);
    } else {
        nextStepButton['onclick'] = func;
    }

}());
