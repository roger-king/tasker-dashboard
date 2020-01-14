type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Optionalize<T extends K, K> = Omit<T, keyof K>;

interface TaskerNotification {
    type: 'success' | 'warn' | 'fail';
    title: string;
    body: string;
}
interface User {
    username: string;
    name: string;
    githubURL: string;
    email: string;
    bio: string;
}

interface PluginSetting {
    type: string;
    active: boolean;
    description: string;
    repo_name: string;
    build_folder_name: string;
}

interface TogglePluginSetting {
    repo_name: string;
    active: boolean;
}

interface Task {
    taskId: string;
    entryId: number;
    name: string;
    description: string;
    executor: string;
    schedule: string;
    isRepeatable: boolean;
    enabled: boolean;
    complete: boolean;
    args: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

interface CronTab {
    second: string | number;
    minute: string | number;
    hour: string | number;
    dayOfMonth: string | number;
    month: string | number;
    dayOfWeek: string | number;
}
interface Time {
    hour: number;
    minute: number;
}
type NewTaskInputKey = keyof NewTaskInput;

interface NewTaskInput {
    name: string;
    description: string;
    schedule: string;
    args: Record<string, any>;
    executor: string;
}

interface Argument {
    key: string;
    value: string;
}

type OK = 'OK';

interface GithubOAuthLoginResponse extends GithhubOAuthhErrorResponse {
    access_token: string;
    scope: string;
    token_type: string;
}

interface GithubOAuthErrorResponse {
    error: string;
    error_description: string;
    error_uri: string;
}

interface OAuthProviderClientIdResponse {
    client_id: string;
}

interface Response {
    error?: string;
    data: OK | GithubOAuthLoginResponse | OAuthProviderClientIdResponse | Task | Task[];
}
