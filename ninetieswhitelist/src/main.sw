contract;

abi whitelist {
    #[storage(read, write)]
    fn create_list(max_capacity: u64, deposit: u64, list_name: str[10]) -> RSVPList;

    #[storage(read, write)]
    fn rsvp(list_id: u64) -> RSVPList;
}

// defining the struct here because it would be used by other developers who would be importing this ABI
pub struct RSVPList {
    unique_id: u64,
    max_capacity: u64,
    deposit: u64,
    owner: Identity,
    name: str[10],
    num_of_rsvps: u64,
}

pub enum InvalidRSVPError {
    IncorrectAssetId: ContractId,
    NotEnoughTokens: u64,
    InvalidEventID: Identity,
}


use std::{
   auth::{AuthError, msg_sender},
    constants::BASE_ASSET_ID,
   call_frames::msg_asset_id,
     context::{
       this_balance,
       msg_amount,
   },
    logging::log,
    result::Result,
    storage::StorageMap,
    token::transfer,
    identity::Identity, //find address of user sending transactions
    contract_id::ContractId,
};

storage {
    lists: StorageMap<u64, RSVPList> = StorageMap {},
    list_id_counter: u64 = 0,
}

impl whitelist for Contract {
    #[storage(read, write)]
    fn create_list(capacity: u64, price: u64, list_name: str[10]) -> RSVPList {
        let campaign_id = storage.list_id_counter;
        let new_list = RSVPList {
            unique_id: campaign_id,
            max_capacity: capacity,
            deposit: price,
            owner: msg_sender().unwrap(),
            name: list_name,
            num_of_rsvps: 0,
        };

        storage.lists.insert(campaign_id, new_list);
        storage.list_id_counter += 1;
        let mut selectedList = storage.lists.get(storage.list_id_counter - 1).unwrap();
        return selectedList;
    }

    #[storage(read, write)]
    fn rsvp(list_id: u64) -> RSVPList {
        let sender = msg_sender().unwrap();
        let asset_id = msg_asset_id();
        let amount = msg_amount();

     // get the event
     //variables are immutable by default, so you need to use the mut keyword
        let mut selected_list = storage.lists.get(list_id).unwrap();

    // check to see if the eventId is greater than storage.event_id_counter, if
    // it is, revert
        require(selected_list.unique_id < storage.list_id_counter, InvalidRSVPError::InvalidEventID(sender));

    // check to see if the asset_id and amounts are correct, etc, if they aren't revert
        require(asset_id == BASE_ASSET_ID, InvalidRSVPError::IncorrectAssetId(asset_id));
        require(amount >= selected_list.deposit, InvalidRSVPError::NotEnoughTokens(amount));

          //send the payout from the msg_sender to the owner of the selected event
        transfer(amount, asset_id, selected_list.owner);

    // edit the event
        selected_list.num_of_rsvps += 1;
        storage.lists.insert(list_id, selected_list);

    // return the event
        return selected_list;
    }
}

