export const GET_MEETING_PARTICIPANTS = `
query gerPariticipant($id:Int!) {
    meetings_by_pk(id:$id){
        user{
          fullName
        }
        participants{
          user{
            email
          }
        }
      }
  }
`