import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Modal, Button, Checkbox, Form, FormGroup, Col, ControlLabel, FormControl, ProgressBar, Fade } from 'react-bootstrap';
import * as UiStateActions from '../actions/uiStateActions';
import {Icon} from 'react-fa'


function mapStateToProps(state) {
  return {
    uiState: state.uiState
  };
}
function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(UiStateActions, dispatch),
  };
}

export class BPlanModalHelp_ extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.uiActions.showHelpComponent(false);
  }
  render() {
    let modalBodyStyle= {
      "overflow-y":"auto",
      "max-height":this.props.uiState.height-200
    }
    console.log(this.props.uiState)
    return (
      <Modal bsSize="large" show={this.props.uiState.helpTextVisible} onHide={this.close} keyboard={false} >
        <Modal.Header  >
          <Modal.Title><Icon name="info"/>&nbsp;&nbsp;&nbsp;Kompaktanleitung B-Plan-Auskunft Wuppertal</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalBodyStyle}>
          <p>Die standardm&auml;&szlig;ig eingestellte Hintergrundkarte gibt eine &Uuml;bersicht &uuml;ber die Wuppertaler 
          Bebauungspl&auml;ne (B-Pl&auml;ne). Gr&uuml;ne Fl&auml;chen (&Uuml;bersichtsma&szlig;stab) bzw. Umringe stehen 
          f&uuml;r rechtswirksame B-Plan-Verfahren, rote Fl&auml;chen / Umringe f&uuml;r laufende Verfahren.</p>
          <p>F&uuml;r Detailinformation und Download m&uuml;ssen Sie zun&auml;chst nach B-Pl&auml;nen suchen. Die Treffer 
          werden automatisch geladen und in der Karte als transparente farbige Fl&auml;chen mit der B-Plan-Nummer in jeder 
          Teilfl&auml;che dargestellt (Geltungsbereiche der B-Pl&auml;ne). Gr&uuml;ne Fl&auml;chen/Nummern stehen f&uuml;r 
          rechtswirksame Verfahren, rote Fl&auml;chen/Nummern f&uuml;r laufende. Eine gr&uuml;ne Fl&auml;che mit roter Nummer 
          bedeutet, dass es unter dieser Nummer ein rechtswirksames und ein laufendes Verfahren gibt, die genau dasselbe Gebiet 
          abdecken.</p>
          <p>Durch Anklicken von&nbsp;<Icon name="search"/>&nbsp;suchen Sie nach B-Pl&auml;nen, die zumindest teilweise im 
          aktuellen Kartenausschnitt liegen. Den Kartenausschnitt k&ouml;nnen Sie durch Ziehen mit der Maus verschieben. Mit 
          den Werkzeugen&nbsp;<Icon name="plus"/>&nbsp;und&nbsp;<Icon name="minus"/>&nbsp;k&ouml;nnen Sie 
          den Kartenma&szlig;stab vergr&ouml;&szlig;ern bzw. verkleinern.</p>
          <p>Um ein B-Plan-Verfahren direkt anzusteuern, geben Sie den Anfang der B-Plan-Nummer im Eingabefeld rechts neben&nbsp;
          <Icon name="search"/>&nbsp;ein (mindestens 2 Ziffern). Alle Verfahren, die mit diesen Ziffern beginnen, werden Ihnen 
          in einer inkrementellen Auswahlliste angeboten. (Wenn sie weitere Zeichen eingeben, wird der Inhalt der Auswahlliste 
          angepasst.) Nach Auswahl eines B-Plan-Verfahrens aus dieser Liste wird ausschlie&szlig;lich der zugeh&ouml;rige Plan 
          geladen. Er wird vollst&auml;ndig und zentriert dargestellt. Das ist vor allem n&uuml;tzlich, um sich einen &Uuml;berblick
           &uuml;ber Pl&auml;ne mit einem komplizierten Geltungsbereich zu verschaffen. (Probieren Sie mal die Nummer 150.) Klicken 
           Sie auf&nbsp;<Icon name="search"/>, um alle Pl&auml;ne hinzuzuladen, die im jetzt aktuellen Ausschnitt liegen. Damit 
           stellen Sie auch sicher, dass Sie keinen Plan &uuml;bersehen, der sich mit dem zuvor gesuchten &uuml;berlappt.</p>
          <p>Um die B-Plan-Situation an einem bestimmten Punkt des Stadtgebietes zu erkunden, geben Sie den Anfang einer 
          Stra&szlig;ennamens oder eines interessanten Ortes (auch Point of Interest oder kurz POI genannt) im Eingabefeld ein 
          (mindestens 2 Ziffern). In der inkrementellen Auswahlliste werden Ihnen passende Treffer angeboten. Durch das vorangestellte 
          Symbol erkennen Sie, ob es sich dabei um eine&nbsp;<Icon name="home"/>&nbsp;Adresse, eine&nbsp;<Icon name="road"/>
          &nbsp;Stra&szlig;e ohne zugeordnete Hausnummern, einen&nbsp;<Icon name="tag"/>&nbsp;POI oder die&nbsp;<Icon name="tags"/>
          &nbsp;alternative Bezeichnung eines POI handelt. (Probieren Sie es mal mit der Eingabe &bdquo;Sankt&ldquo;.) Nach der Auswahl 
          eines Eintrags wird die entsprechende Position in der Karte markiert. B-Plan-Verfahren werden hier allerdings in der Umgebung 
          dieses Punktes gesucht, in einem Kartenausschnitte der Zoomstufe 14. Sie erhalten daher in der Regel mehrere Treffer.</p>
          <p>Der beste Treffer einer Suche erh&auml;lt den Fokus (blaue Umrandung). In der Info-Box werden Ihnen immer die Detailinformationen
          und Downloadlinks f&uuml;r denjenigen B-Plan angeboten, der gerade den Fokus hat. Mit einem einfachen Klick auf eine andere 
          B-Plan-Fl&auml;che aus der Treffermenge (nicht auf die B-Plan-Nummer!) erh&auml;lt dieser Plan den Fokus. Mit einem weiteren 
          Klick wird der Kartenausschnitt so angepasst, dass dieser Plan vollst&auml;ndig und zentriert dargestellt wird. Alternativ 
          k&ouml;nnen Sie die Treffermenge mit den Schaltfl&auml;chen&nbsp;<a href="#">&gt;&gt;</a>&nbsp;(n&auml;chster Treffer) und 
          &nbsp;<a href="#">&lt;&lt;</a>&nbsp;(vorheriger Treffer) durchmustern. (Die Treffermenge ist geordnet nach zunehmendem 
          Abstand des Plans vom Bezugspunkt ihrer Suche.) Mit&nbsp;<a href="#">alle Treffer anzeigen</a>&nbsp;k&ouml;nnen Sie den 
          Kartenausschnitt zuvor so anpassen, dass alle Pl&auml;ne der Treffermenge vollst&auml;ndig angezeigt werden.</p>
          <p>Zum Download des Plans, der gerade den Fokus hat, klicken Sie auf den Link&nbsp;<a href="#">Plan</a>. Wenn das 
          B-Plan-Verfahren nur einen Planteil hat, wird dieser als PDF-Dokument heruntergeladen. Umfasst es mehrere Planteile, 
          werden diese als zip-Archiv bereitgestellt. (Der Link lautet dann&nbsp;<a href="#">Pl&auml;ne</a>.) Wenn zu einem 
          B-Plan-Verfahren weitere verfahrensbegleitende Dokumente verf&uuml;gbar sind, wird zus&auml;tzlich der Link&nbsp;
          <a href="#">alles</a>&nbsp;zum Download eines zip-Archivs mit allen Planteilen und allen verfahrensbegleitenden 
          Dokumenten angeboten. Ob die heruntergeladene Datei nach dem Download sofort mit einem geeigneten Programm
           (PDF-Viewer oder Dateimanager) ge&ouml;ffnet wird, h&auml;ngt von Ihren Betriebssystem- und/oder Browsereinstellungen 
           ab.</p>        
          </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" type="submit" onClick={this.close}>Ok</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}



const BPlanModalHelp = connect(mapStateToProps, mapDispatchToProps)(BPlanModalHelp_);
export default BPlanModalHelp;

BPlanModalHelp_.propTypes = {
  uiActions: PropTypes.object,
  uiState: PropTypes.object
};
