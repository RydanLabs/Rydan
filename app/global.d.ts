interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string
            callback: (response: any) => void
            nonce?: string
            use_fedcm_for_prompt: boolean
          }) => void
          prompt: () => void
        }
      }
    }
  }
  