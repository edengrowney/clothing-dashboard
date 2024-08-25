import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Insights.css';

const Insights: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Insights</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Insights</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Insights" />
      </IonContent>
    </IonPage>
  );
};

export default Insights;
