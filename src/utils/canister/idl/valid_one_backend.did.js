export const idlFactory = ({ IDL }) => {
  const Sign = IDL.Record({
    'modify_time' : IDL.Nat64,
    'signature' : IDL.Text,
    'content' : IDL.Text,
    'hash' : IDL.Text,
    'uuid' : IDL.Text,
    'created_by' : IDL.Nat32,
    'create_time' : IDL.Nat64,
    'sign_type' : IDL.Nat32,
  });
  const UserProfile = IDL.Record({
    'id' : IDL.Nat32,
    'bio' : IDL.Text,
    'modify_time' : IDL.Nat64,
    'public_key' : IDL.Text,
    'name' : IDL.Text,
    'create_time' : IDL.Nat64,
    'avatar' : IDL.Text,
  });
  return IDL.Service({
    'finish_authentication' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'finish_authentication_new' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'finish_register' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'finish_register_new' : IDL.Func([IDL.Text], [IDL.Nat32], []),
    'get_allow_credentials' : IDL.Func([IDL.Nat32], [IDL.Text], ['query']),
    'get_list' : IDL.Func([IDL.Nat32], [IDL.Text], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
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
    'sign' : IDL.Func(
        [IDL.Nat32, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({ 'signature_hex' : IDL.Text }),
            'Err' : IDL.Text,
          }),
        ],
        [],
      ),
    'sign_get' : IDL.Func([IDL.Nat32], [IDL.Text], ['query']),
    'sign_insert' : IDL.Func([IDL.Text], [IDL.Opt(Sign)], []),
    'start_authentication' : IDL.Func([IDL.Text], [IDL.Text], []),
    'start_authentication_new' : IDL.Func([IDL.Nat32], [IDL.Text], []),
    'start_register' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'start_register_new' : IDL.Func([], [IDL.Text], []),
    'user_current_id' : IDL.Func([], [IDL.Nat32], ['query']),
    'user_profile_get' : IDL.Func([IDL.Nat32], [IDL.Opt(UserProfile)], []),
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
  });
};
export const init = ({ IDL }) => { return []; };
