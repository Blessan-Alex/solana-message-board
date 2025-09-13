// Generated IDL for solana_message_board program
export const IDL = {
  "address": "CTo9zyKZRzHmQT7TvogQ6r8Z7AMd8asTf8AMyBAJFcUj",
  "metadata": {
    "name": "solana_message_board",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "delete_message",
      "discriminator": [
        198,
        99,
        22,
        204,
        200,
        165,
        54,
        138
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true
        },
        {
          "name": "author",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "edit_message",
      "discriminator": [
        227,
        55,
        144,
        146,
        187,
        130,
        254,
        189
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true
        },
        {
          "name": "author",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "new_content",
          "type": "string"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
    },
    {
      "name": "like_message",
      "discriminator": [
        142,
        56,
        187,
        65,
        58,
        193,
        242,
        90
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "post_message",
      "discriminator": [
        214,
        50,
        100,
        209,
        38,
        34,
        7,
        76
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true,
          "signer": true
        },
        {
          "name": "author",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "unlike_message",
      "discriminator": [
        40,
        71,
        189,
        42,
        10,
        209,
        235,
        193
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "MessageAccount",
      "discriminator": [
        97,
        144,
        24,
        58,
        225,
        40,
        89,
        223
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ContentTooLong",
      "msg": "Content exceeds maximum length"
    },
    {
      "code": 6001,
      "name": "AlreadyLiked",
      "msg": "User has already liked this message"
    },
    {
      "code": 6002,
      "name": "NotLiked",
      "msg": "User has not liked this message"
    },
    {
      "code": 6003,
      "name": "UnauthorizedEdit",
      "msg": "Only the author can edit this message"
    },
    {
      "code": 6004,
      "name": "CannotEditDeleted",
      "msg": "Cannot edit a deleted message"
    },
    {
      "code": 6005,
      "name": "UnauthorizedDelete",
      "msg": "Only the author can delete this message"
    },
    {
      "code": 6006,
      "name": "AlreadyDeleted",
      "msg": "Message is already deleted"
    }
  ],
  "types": [
    {
      "name": "MessageAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "pubkey"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "likes",
            "type": "u32"
          },
          {
            "name": "liked_by",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "is_deleted",
            "type": "bool"
          },
          {
            "name": "edit_count",
            "type": "u32"
          },
          {
            "name": "last_edited",
            "type": {
              "option": "i64"
            }
          }
        ]
      }
    }
  ]
} as const;