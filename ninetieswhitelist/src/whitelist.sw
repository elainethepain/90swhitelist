//creating a new list and setting the details
// user whitelisting through rsvp

library whitelist;

use std::{
    identity::Identity, //find address of user sending transactions
    contract_id::ContractId,
};

abi whitelist {
    #[storage(read, write)]
    fn create_list(max_capacity: u64, deposit: u64, list_name: str[10]) -> List;

    #[storage(read, write)]
    fn rsvp(list_id: u64) -> List;
}

// defining the struct here because it would be used by other developers who would be importing this ABI
pub struct List {
    unique_id: u64,
    max_capacity: u64,
    deposit: u64,
    owner: Identity,
    name: str[10],
    num_of_rsvps: u64,
}