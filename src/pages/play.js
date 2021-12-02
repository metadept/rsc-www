import Container from '../components/container';
import Header from '../components/header';
import Link from 'next/link';
import PageName from '../components/page-name';


function DisplayClient(props) {
    const { type } = props;

    return (
        <div className={`rsc-game-select rsc-select-${type}`}>
            
        </div>
    );
}

export default function Play() {
    return (
        <div>
            <Header pageName="Select Game Type" />
            <Container>
                <PageName pageName="Select Game Type" />
                
            </Container>
        </div>
    );
}
