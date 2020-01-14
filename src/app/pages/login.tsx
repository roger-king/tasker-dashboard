import React, { useEffect, useState } from 'react';
import { Box } from 'grommet';
import { useLocation, useHistory } from 'react-router-dom';
import qs, { ParsedQuery } from 'query-string';
import GithubOAuthLoginBtn from '../components/oauth/github';

import { authenticate, fetchUserClientId, check } from '../data/auth';
import { GITHUB_LOGIN_SCOPE, LOGIN_STATUS, REDIRECT_URL } from '../app.constants';
import Logo from '../components/logo';

const LoginPage: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const [clientId, setClientId] = useState<string>('');
    const [status, setStatus] = useState<LOGIN_STATUS>(LOGIN_STATUS.INITIAL);
    const [error, setError] = useState<string | null>(null);
    const isDisabled = clientId.length === 0;

    useEffect(() => {
        const redirectURL = sessionStorage.getItem(REDIRECT_URL);

        check().then(isAuthed => {
            if (isAuthed) {
                history.push('/tasker/admin');
                return;
            }

            if (clientId.length > 0) {
                const queryString = location.search;
                const q: ParsedQuery = qs.parse(queryString);

                if (q && q.code) {
                    setStatus(LOGIN_STATUS.LOADING);

                    const code = q.code;
                    authenticate(code as string).then((data: any) => {
                        if (data.error && data.error.length > 0) {
                            setError(data.error_description);
                            setStatus(LOGIN_STATUS.ERROR);
                            return;
                        }

                        setStatus(LOGIN_STATUS.SUCCESS);
                        if (redirectURL) {
                            history.push(redirectURL);
                            sessionStorage.removeItem(REDIRECT_URL);
                        } else {
                            history.push('/tasker/admin');
                        }
                    });
                }
            } else {
                // Fetch for client id
                fetchUserClientId().then(({ data }: { data: OAuthProviderClientIdResponse }) => {
                    if (data.client_id.length > 0) {
                        setClientId(data.client_id);
                    }
                });
            }
        });
    }, [clientId.length, location.search, history]);

    if (status === LOGIN_STATUS.LOADING) {
        return <Box>logging in...</Box>;
    }

    if (status === LOGIN_STATUS.ERROR) {
        if (error) {
            return <Box>{error}</Box>;
        }
        return <Box>error occured</Box>;
    }

    return (
        <Box align="center" pad={{ top: '500px' }} fill>
            <Box direction="row" align="center">
                <Logo />
            </Box>
            <GithubOAuthLoginBtn clientId={clientId} scope={GITHUB_LOGIN_SCOPE} isDisabled={isDisabled} />
        </Box>
    );
};

export default LoginPage;
