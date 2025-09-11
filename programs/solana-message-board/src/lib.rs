use anchor_lang::prelude::*;

declare_id!("AEtjhvM2nkjjrvQF1K2xcPV9mERpbjqrZEvgKavmbuaR");

#[program]
pub mod solana_message_board {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn post_message(ctx: Context<PostMessage>, content: String) -> Result<()> {
        require!(content.len() <= MAX_CONTENT_LENGTH, MessageError::ContentTooLong);

        let message_account = &mut ctx.accounts.message;
        message_account.author = ctx.accounts.author.key();
        message_account.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct PostMessage<'info> {
    #[account(
        init,
        payer = author,
        space = 8 + 32 + 4 + MAX_CONTENT_LENGTH
    )]
    pub message: Account<'info, MessageAccount>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MessageAccount {
    pub author: Pubkey,
    pub content: String,
}

pub const MAX_CONTENT_LENGTH: usize = 280; // bytes, adjust as needed

#[error_code]
pub enum MessageError {
    #[msg("Content exceeds maximum length")] 
    ContentTooLong,
}
