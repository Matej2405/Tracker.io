use anchor_lang::prelude::*;
pub mod constant;
pub mod states;
use crate::{constant::*, states::*};

declare_id!("9S5V9NH11sNjxd26fijr1LuajkuLh95tqp7xgtV3xK8c");
//create a PDA(program derived account)
#[program]
pub mod trackerio {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        //init userprofile account with default data
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.last_organization = 0;
        user_profile.organization_count = 0;
        Ok(())
    }
    //add a team/organization
    pub fn create_Organization(
        ctx: Context<CreateOrganization>,
        name: String,
        description: String,
        maxMemberNumber: String, //how many team members
        image: String,
    ) -> Result<()> {
        //initialize an organization account
        let organization_account = &mut ctx.accounts.organization_account;
        let user_profile = &mut ctx.accounts.user_profile;

        organization_account.authority = ctx.accounts.authority.key();
        organization_account.idx = user_profile.last_organization;
        organization_account.name = name;
        organization_account.description = description;
        organization_account.maxMemberNumber = maxMemberNumber;
        organization_account.image = image;
        organization_account.isFull = false;

        //Increase organization idx for PDA
        user_profile.last_organization = user_profile.last_organization.checked_add(1).unwrap();

        user_profile.organization_count = user_profile.organization_count.checked_add(1).unwrap();

        Ok(())
    }
    pub fn update_Organization(
        ctx: Context<UpdateOrganization>,
        _organization_idx: u8,
        name: String,
        description: String,
        maxMemberNumber: String,
        img: String,
    ) -> Result<()> {
        let organization_account = &mut ctx.accounts.organization_account;

        organization_account.name = name;
        organization_account.description = description;
        organization_account.maxMemberNumber = maxMemberNumber;
        organization_account.image = img;

        Ok(())
    }
    pub fn remove_Organization(
        ctx: Context<RemoveOrganization>,
        _organization_idx: u8,
    ) -> Result<()> {
        //decrement organization total counter
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.organization_count = user_profile.organization_count.checked_sub(1).unwrap();

        Ok(())
    }
    pub fn join_Organization(
        ctx: Context<JoinOrganization>,
        idx: u8,
        date: String,
        name: String,
        description: String,
        maxMemberNumber: String,
        img: String,
    ) -> Result<()> {
        let organization_member_account = &mut ctx.accounts.organization_member_account;
        organization_member_account.idx = idx;
        organization_member_account.authority = ctx.accounts.authority.key();
        organization_member_account.date = date;
        organization_member_account.name = name;
        organization_member_account.description = description;
        organization_member_account.maxMemberNumber = maxMemberNumber;
        organization_member_account.image = img;
        organization_member_account.isFull = true;

        Ok(())
    }
    pub fn leave_Organization(
        ctx: Context<LeaveOrganization>,
        _organization_member_idx: u8,
    ) -> Result<()> {
        Ok(())
    }
}

//creating the PDA-s(kao da radimo API)
#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(init, seeds = [USER_TAG, authority.key().as_ref()], bump, payer = authority, space = 32 + 1 + 1 + 8)]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct CreateOrganization<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        init,
        seeds = [AIRBNB_TAG, authority.key().as_ref(),&[user_profile.last_organization]],
        bump,
        payer = authority,
        space = 2865 + 8,
    )]
    pub organization_account: Box<Account<'info, OrganizationAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
#[instruction(organization_idx:u8)]
pub struct UpdateOrganization<'info> {
    #[account(
        mut,
        seeds = [AIRBNB_TAG, authority.key().as_ref(), &[organization_idx].as_ref()],
        bump,
        has_one = authority,
    )]
    pub organization_account: Box<Account<'info, OrganizationAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
#[instruction(organization_idx:u8)]
pub struct RemoveOrganization<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
     )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        mut,
        close = authority,
        seeds = [AIRBNB_TAG, authority.key().as_ref(), &[organization_idx].as_ref()],
        bump,
        has_one = authority,
    )]
    pub organization_account: Box<Account<'info, OrganizationAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
//booking accounts
#[derive(Accounts)]
#[instruction()]
pub struct JoinOrganization<'info> {
    //userprofile
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    //initialize bookingAccount
    #[account(
        init,
        seeds = [BOOK_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 3125 + 8,
    )]
    pub organization_member_account: Box<Account<'info, OrganizationMemberAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct LeaveOrganization<'info> {
    #[account(
        mut,
        close = authority,
        seeds = [BOOK_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub organization_member_account: Box<Account<'info, OrganizationMemberAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
