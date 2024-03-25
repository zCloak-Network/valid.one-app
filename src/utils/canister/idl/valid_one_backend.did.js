export const idlFactory = ({ IDL }) => {
  const Sign = IDL.Record({
    modify_time: IDL.Nat64,
    signature: IDL.Text,
    content: IDL.Text,
    hash: IDL.Text,
    uuid: IDL.Text,
    created_by: IDL.Nat32,
    create_time: IDL.Nat64,
    sign_type: IDL.Nat8,
  });
  const UserProfile = IDL.Record({
    id: IDL.Nat32,
    bio: IDL.Text,
    modify_time: IDL.Nat64,
    public_key: IDL.Text,
    name: IDL.Text,
    create_time: IDL.Nat64,
    avatar: IDL.Text,
  });
  return IDL.Service({
    finish_authentication_new: IDL.Func([IDL.Text], [IDL.Nat32], []),
    finish_register_new: IDL.Func([IDL.Text], [IDL.Nat32], []),
    get_allow_credentials: IDL.Func([IDL.Nat32], [IDL.Text], ["query"]),
    get_valid_id_by_credential: IDL.Func(
      [IDL.Text],
      [IDL.Opt(IDL.Nat32)],
      ["query"]
    ),
    greet: IDL.Func(
      [IDL.Text],
      [IDL.Variant({ Ok: IDL.Text, Err: IDL.Text })],
      ["query"]
    ),
    map_get: IDL.Func([IDL.Nat], [IDL.Opt(IDL.Nat)], ["query"]),
    map_insert: IDL.Func([IDL.Nat, IDL.Nat], [IDL.Opt(IDL.Nat)], []),
    public_key: IDL.Func(
      [IDL.Nat32],
      [
        IDL.Variant({
          Ok: IDL.Record({ public_key_hex: IDL.Text }),
          Err: IDL.Text,
        }),
      ],
      []
    ),
    sign: IDL.Func(
      [IDL.Nat32, IDL.Text],
      [
        IDL.Variant({
          Ok: IDL.Record({ signature_hex: IDL.Text }),
          Err: IDL.Text,
        }),
      ],
      []
    ),
    sign_get_by_uuid: IDL.Func([IDL.Text], [IDL.Opt(Sign)], ["query"]),
    sign_insert: IDL.Func(
      [IDL.Text, IDL.Nat8, IDL.Text, IDL.Text, IDL.Text],
      [IDL.Variant({ Ok: Sign, Err: IDL.Text })],
      []
    ),
    sign_paginate: IDL.Func([IDL.Nat32, IDL.Nat32], [IDL.Vec(Sign)], ["query"]),
    start_authentication_new: IDL.Func([IDL.Nat32], [IDL.Text], []),
    start_register_new: IDL.Func([], [IDL.Text], []),
    user_current_id: IDL.Func([], [IDL.Nat32], ["query"]),
    user_profile_edit: IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
      [IDL.Variant({ Ok: IDL.Text, Err: IDL.Text })],
      []
    ),
    user_profile_get: IDL.Func([IDL.Nat32], [IDL.Opt(UserProfile)], ["query"]),
    user_profile_get_by_pub_key: IDL.Func(
      [IDL.Text],
      [IDL.Opt(UserProfile)],
      ["query"]
    ),
    user_profile_insert: IDL.Func([IDL.Text], [IDL.Opt(UserProfile)], []),
    verify: IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text],
      [
        IDL.Variant({
          Ok: IDL.Record({ is_signature_valid: IDL.Bool }),
          Err: IDL.Text,
        }),
      ],
      []
    ),
  });
};
export const init = ({ IDL }) => {
  return [];
};
