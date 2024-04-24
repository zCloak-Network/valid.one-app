export const idlFactory = ({ IDL }) => {
  const City = IDL.Record({
    'id' : IDL.Nat32,
    'name' : IDL.Opt(IDL.Text),
    'name2' : IDL.Opt(IDL.Text),
    'name3' : IDL.Opt(IDL.Text),
    'name4' : IDL.Opt(IDL.Text),
  });
  const Sign = IDL.Record({
    'modify_time' : IDL.Nat64,
    'signature' : IDL.Text,
    'content_key' : IDL.Text,
    'hash' : IDL.Text,
    'uuid' : IDL.Text,
    'created_by' : IDL.Nat32,
    'create_time' : IDL.Nat64,
    'sign_type' : IDL.Nat8,
  });
  const SignResult = IDL.Record({
    'result' : IDL.Vec(Sign),
    'size' : IDL.Nat32,
  });
  const UserProfile = IDL.Record({
    'id' : IDL.Nat32,
    'bio' : IDL.Text,
    'modify_time' : IDL.Nat64,
    'public_key' : IDL.Text,
    'name' : IDL.Text,
    'create_time' : IDL.Nat64,
    'twitter_handle' : IDL.Opt(IDL.Text),
    'avatar' : IDL.Text,
  });
  return IDL.Service({
    'city_get' : IDL.Func([IDL.Nat32], [IDL.Opt(City)], ['query']),
    'city_insert' : IDL.Func([IDL.Nat32, IDL.Text, IDL.Text, IDL.Text], [], []),
    'city_length' : IDL.Func([], [IDL.Nat64], ['query']),
    'finish_authentication_name' : IDL.Func([IDL.Text], [IDL.Text], []),
    'finish_register_name' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text })],
        [],
      ),
    'get_allow_credentials_name' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Text)],
        ['query'],
      ),
    'get_config' : IDL.Func([], [IDL.Text], ['query']),
    'get_name_by_credential' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Text)],
        ['query'],
      ),
    'greet' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text })],
        ['query'],
      ),
    'map_get' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Nat)], ['query']),
    'map_insert' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Opt(IDL.Nat)], []),
    'public_key' : IDL.Func(
        [IDL.Nat32],
        [
          IDL.Variant({
            'Ok' : IDL.Record({ 'public_key_hex' : IDL.Text }),
            'Err' : IDL.Text,
          }),
        ],
        [],
      ),
    'sign_get_by_hash' : IDL.Func(
        [IDL.Text, IDL.Opt(IDL.Nat32)],
        [IDL.Opt(IDL.Vec(Sign))],
        ['query'],
      ),
    'sign_get_by_signature' : IDL.Func([IDL.Text], [IDL.Opt(Sign)], ['query']),
    'sign_get_by_uuid' : IDL.Func([IDL.Text], [IDL.Opt(Sign)], ['query']),
    'sign_insert' : IDL.Func(
        [IDL.Text, IDL.Nat8, IDL.Text, IDL.Text],
        [IDL.Variant({ 'Ok' : Sign, 'Err' : IDL.Text })],
        [],
      ),
    'sign_paginate' : IDL.Func([IDL.Nat32, IDL.Nat32], [SignResult], ['query']),
    'start_authentication_name' : IDL.Func([IDL.Text], [IDL.Text], []),
    'start_register_name' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text })],
        [],
      ),
    'twitter_verify' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text })],
        [],
      ),
    'user_current_id' : IDL.Func([], [IDL.Nat32], ['query']),
    'user_profile_edit' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text })],
        [],
      ),
    'user_profile_get' : IDL.Func(
        [IDL.Nat32],
        [IDL.Opt(UserProfile)],
        ['query'],
      ),
    'user_profile_get_by_name' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(UserProfile)],
        ['query'],
      ),
    'user_profile_get_by_pub_key' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(UserProfile)],
        ['query'],
      ),
    'user_profile_insert' : IDL.Func([IDL.Text], [IDL.Opt(UserProfile)], []),
    'verify' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({ 'is_signature_valid' : IDL.Bool }),
            'Err' : IDL.Text,
          }),
        ],
        [],
      ),
    'verify_bytes65' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({ 'is_signature_valid' : IDL.Bool }),
            'Err' : IDL.Text,
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
