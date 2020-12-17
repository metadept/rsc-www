import Container from '../components/container';
import Header from '../components/header';
import Link from 'next/link';
import PageName from '../components/page-name';

function GameSelectButton(props) {
    const type = props.type;

    return (
        <div className={`rsc-game-select rsc-select-${type}`}>
            <Link href="#">
                <a class="rsc-select-button">
                    <small>Click here for</small>

                    <strong>
                        {type}
                        <br />
                        game
                    </strong>
                </a>
            </Link>
        </div>
    );
}

export default function Play(props) {
    return (
        <div>
            <Header pageName="Select Game Type" />
            <Container>
                <PageName pageName="Select Game Type" />

                <section className="rsc-game-select-wrap">
                    <GameSelectButton type="free" />
                    <GameSelectButton type="members" />
                </section>
                <div class="rsc-scroll">
                    <label for="rsc-client-type">
                        Select client version - only change this if the default
                        doesn't work
                    </label>
                    <br />
                    <select id="rsc-client-type">
                        <option value="web">
                            Web Client Using JavaScript (Recommended)
                        </option>
                        <option value="download">
                            Desktop Client Using Java
                        </option>
                    </select>
                </div>
            </Container>
        </div>
    );
}
