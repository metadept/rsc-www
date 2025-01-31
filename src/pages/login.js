import Container from '../components/container';
import Header from '../components/header';
import Link from 'next/link';
import PageName from '../components/page-name';
import UsernameInput from '../components/username-input';
import { SessionContext } from '../contexts/session';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Secure Login';

export default function Login(props) {
    const { token } = useContext(SessionContext);
    const router = useRouter();
    const redirect = router.query.to;

    const askLogin = redirect ? (
        <p>
            <strong className="rsc-caution-text">
                You need to login to access this feature
            </strong>
        </p>
    ) : undefined;

    const message = props.errorMessage ? (
        <p>
            <strong className="rsc-warning-text">{props.errorMessage}</strong>
        </p>
    ) : undefined;

    const onSubmit = (event) => {
        setTimeout(() => {
            event.target.querySelector('input[type="submit"]').disabled = true;
            document.body.style.cursor = 'busy';
        }, 2);
    };

    return (
        <div>
            <Header pageName={PAGE_TITLE} />
            <Container>
                <PageName pageName={PAGE_TITLE} />
                <div className="rsc-row">
                    <div className="rsc-col rsc-col-100">
                        <div className="rsc-box">
                            {askLogin}
                            {message}
                            <div className="rsc-form rsc-login-form">
                                <form
                                    action="/login"
                                    method="post"
                                    onSubmit={onSubmit}
                                >
                                    <input
                                        type="hidden"
                                        name="_csrf"
                                        value={token}
                                    />
                                    <input
                                        type="hidden"
                                        name="redirect"
                                        value={redirect}
                                    />
                                    <div className="rsc-row">
                                        <label
                                            htmlFor="username"
                                            className="rsc-col rsc-col-50 rsc-form-label"
                                        >
                                            Username:
                                        </label>
                                        <div className="rsc-col rsc-col-50">
                                            <UsernameInput
                                                name="username"
                                                id="username"
                                            />
                                        </div>
                                    </div>
                                    <div className="rsc-row">
                                        <label
                                            htmlFor="password"
                                            className="rsc-col rsc-col-50 rsc-form-label"
                                        >
                                            Password:
                                        </label>
                                        <div className="rsc-col rsc-col-50">
                                            <input
                                                className="rsc-input"
                                                name="password"
                                                id="password"
                                                type="password"
                                                maxLength="20"
                                                minLength="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="rsc-row">
                                        <label
                                            htmlFor="remember"
                                            className="rsc-col rsc-col-50 rsc-form-label"
                                        >
                                            Remember me:
                                        </label>
                                        <div className="rsc-col rsc-col-50">
                                            <input
                                                className="rsc-input"
                                                name="remember"
                                                id="remember"
                                                type="checkbox"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        className="rsc-input"
                                        type="submit"
                                        value="Secure Login"
                                    />
                                </form>
                                <br />
                                <div className="rsc-row">
                                    <div className="rsc-col rsc-col-50">
                                        <div className="rsc-stone-box">
                                            <Link href="#">
                                                <a className="rsc-link">
                                                    <h2>Lost password?</h2>
                                                </a>
                                            </Link>
                                            If you have lost/forgotten your
                                            password or need to recover your
                                            account.
                                        </div>
                                    </div>
                                    <div className="rsc-col rsc-col-50">
                                        <div className="rsc-stone-box">
                                            <Link href="/manual/about/getting-started">
                                                <a className="rsc-link">
                                                    <h2>Need an account?</h2>
                                                </a>
                                            </Link>
                                            Create a RuneScape account to access
                                            our game and secure services.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export async function getServerSideProps({ req }) {
    if (req.session.user && req.session.user.id) {
        return { redirect: { destination: '/', permanent: false } };
    }

    return { props: { errorMessage: req.errorMessage || null } };
}
