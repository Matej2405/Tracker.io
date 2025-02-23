use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub last_organization: u8,
    pub organization_count: u8,
}

#[account]
#[derive(Default)]
pub struct OrganizationAccount {
    pub authority: Pubkey,       
    pub idx: u8,                 
    pub name: String,            
    pub description: String,     
    pub maxMemberNumber: String, 
    pub image: String,           
    pub isFull: bool,            
}

#[account]
#[derive(Default)]
pub struct OrganizationMemberAccount {
    pub authority: Pubkey,       
    pub date: String,            
    pub idx: u8,                 
    pub name: String,            
    pub description: String,     
    pub maxMemberNumber: String, 
    pub image: String,           
    pub isFull: bool,            
}
