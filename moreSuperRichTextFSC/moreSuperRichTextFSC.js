/*
Flow Lightning Web Component:  superRichTextFSL
Created By:  Nick Sauer
Created Date:  06/25/2020
*/
import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { FlowNavigationNextEvent, FlowNavigationBackEvent } from 'lightning/flowSupport';

export default class moreSuperRichTextFSC extends LightningElement {
    //Input and Output Attributes for Flow
    @api richText;
    @api disallowedSymbols;
    @api disallowedWords;
    @api disallowedSymbolsMessage;
    @api disallowedWordsMessage;
    @api disallowedSymbolsType = 'error';
    @api disallowedWordsType = 'error';
    @api disallowedSymbolsMode = 'sticky';
    @api disallowedWordsMode = 'sticky';
    @api autoReplaceMap;
    @api isValidCheck = false;
    @api allowBack;
    @api hardBlock;
    @api fullButton;

    //Other Variables
    @track searchTerm = '';
    @track replaceValue = '';
    @track interimValue = '';
    @track symbolsNotAllowed;
    @track wordsNotAllowed;
    @track oldRichText;
    @track searchButton = false;
    @track searchTrue = false;
    @track allowRevert = false;
    replaceMap = {};
    regTerm = '';
    applyTerm = '';
    symbolTitle = 'Invalid Symbols';
    wordTitle = 'Invalid Words';
    errorTitle = 'Cannot Save - Invalid Symbols/Words';
    errorMessage = 'Correct Invalid Symbols and Words';

    //Begin functionality

    //Set initial values on load
    connectedCallback() {
        this.symbolsNotAllowed = new RegExp(this.disallowedSymbols);
        this.wordsNotAllowed = new RegExp(this.disallowedWords);
        this.replaceMap = JSON.parse(this.autoReplaceMap);
        this.isValidCheck = true;
    }

    //Handle updates to Rich Text field
    handleTextChange(event) {
        this.interimValue = (event.target.value).toLowerCase();
        this.interimValue = this.interimValue.replace(/(<([^>]+)>)/ig, "");

        if (this.symbolsNotAllowed.test(this.interimValue)) {
            this.isValidCheck = false;
            const evt = new ShowToastEvent({
                title: this.symbolTitle,
                message: this.disallowedSymbolsMessage,
                variant: this.disallowedSymbolsType,
                mode: this.disallowedSymbolsMode
            });
            this.dispatchEvent(evt);
        }
        else if (this.wordsNotAllowed.test(this.interimValue)) {
            this.isValidCheck = false;
            const evt = new ShowToastEvent({
                title: this.wordTitle,
                message: this.disallowedWordsMessage,
                variant: this.disallowedWordsType,
                mode: this.disallowedWordsMode
            });
            this.dispatchEvent(evt);
        } else {
            this.isValidCheck = true;
            this.richText = event.target.value;
        }
    }

    //Check for validity and invoke Navigation Next if met
    handleGoNext() {
        console.log('isValidCheck on handle go next: ' + this.isValidCheck);
        console.log('hard block on handle go next: ' + this.hardBlock);
        if (!this.isValidCheck && this.hardBlock) {
            const evt = new ShowToastEvent({
                title: this.errorTitle,
                message: this.errorMessage,
                variant: 'error',
                mode: 'sticky'
            });
            this.dispatchEvent(evt);
            return;
        }
        const nextNavigationEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(nextNavigationEvent);
    }

    //Invoke Navigation Back
    handleGoBack() {
        const backNavigationEvent = new FlowNavigationBackEvent();
        this.dispatchEvent(backNavigationEvent);
    }

    //Handle initiation of Search and Replace
    handleOpenSearch(event) {
        this.selectTrue = !this.selectTrue;
        if (this.searchButton) this.searchButton = false;
        else this.searchButton = true;
    }

    //Search and Replace Search for Value
    handleSearchChange(event) {
        this.searchTerm = (event.target.value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    //Search and Replace Replace with Value
    handleReplaceChange(event) {
        this.replaceValue = (event.target.value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    //Execute Search and REplace
    searchReplace() {
        this.oldRichText = this.richText;
        this.allowRevert = true;
        let draftValue = this.richText;
        this.searchTerm = this.escapeRegExp(this.searchTerm);
        this.replaceValue = this.escapeRegExp(this.replaceValue);
        draftValue = this.replaceAll(draftValue, this.searchTerm, this.replaceValue);
        this.isValidCheck = true;
        this.richText = draftValue;
    }

    //Execute Auto-Replacement based on map.
    applySuggested(event) {
        this.oldRichText = this.richText;
        this.allowRevert = true;
        let draftValue = this.richText;
        console.log('draftValue in text: ' + draftValue);
        let regTerm = '';
        for (var key in this.replaceMap) {
            console.log('key in loop: ' + key);
            this.applyTerm = this.replaceMap[key];
            this.regTerm = key;
            draftValue = this.replaceAll(draftValue, this.regTerm, this.applyTerm);
        }
        this.isValidCheck = true;
        this.richText = draftValue;
    }

    //Replace All function helper
    replaceAll(str, term, replacement) {
        return str.replace(new RegExp(term, 'ig'), replacement);
    }

    //Undo last change
    handleRevert() {
        this.richText = this.oldRichText;
        this.allowRevert = false;
    }

    //Clean input for RegExp
    escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

}