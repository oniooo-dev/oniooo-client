declare namespace google.accounts.id {
    function initialize(config: {
        client_id: string,
        callback: (response: any) => void,
        nonce?: string,
        use_fedcm_for_prompt?: boolean,
    }): void;

    function prompt(): void;
}