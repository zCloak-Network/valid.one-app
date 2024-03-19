import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Sign {
  'modify_time' : bigint,
  'signature' : string,
  'content' : string,
  'hash' : string,
  'uuid' : string,
  'created_by' : number,
  'create_time' : bigint,
  'sign_type' : number,
}
export interface UserProfile {
  'id' : number,
  'bio' : string,
  'modify_time' : bigint,
  'public_key' : string,
  'name' : string,
  'create_time' : bigint,
  'avatar' : string,
}
export interface _SERVICE {
  'finish_authentication' : ActorMethod<[string, string], boolean>,
  'finish_authentication_new' : ActorMethod<[string], boolean>,
  'finish_register' : ActorMethod<[string, string], boolean>,
  'finish_register_new' : ActorMethod<[string], number>,
  'get_allow_credentials' : ActorMethod<[number], string>,
  'get_list' : ActorMethod<[number], string>,
  'greet' : ActorMethod<[string], string>,
  'map_get' : ActorMethod<[bigint], [] | [bigint]>,
  'map_insert' : ActorMethod<[bigint, bigint], [] | [bigint]>,
  'public_key' : ActorMethod<
    [number],
    { 'Ok' : { 'public_key_hex' : string } } |
      { 'Err' : string }
  >,
  'sign' : ActorMethod<
    [number, string],
    { 'Ok' : { 'signature_hex' : string } } |
      { 'Err' : string }
  >,
  'sign_get' : ActorMethod<[number], string>,
  'sign_insert' : ActorMethod<[string], [] | [Sign]>,
  'start_authentication' : ActorMethod<[string], string>,
  'start_authentication_new' : ActorMethod<[number], string>,
  'start_register' : ActorMethod<[string, string], string>,
  'start_register_new' : ActorMethod<[], string>,
  'user_current_id' : ActorMethod<[], number>,
  'user_profile_get' : ActorMethod<[number], [] | [UserProfile]>,
  'user_profile_insert' : ActorMethod<[string], [] | [UserProfile]>,
  'verify' : ActorMethod<
    [string, string, string],
    { 'Ok' : { 'is_signature_valid' : boolean } } |
      { 'Err' : string }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
