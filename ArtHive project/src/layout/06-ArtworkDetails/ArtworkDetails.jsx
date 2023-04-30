import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { artworkData } from '../artworkSlice'
import { useSelector } from 'react-redux'
import { NavBar } from '../../components/Navbar/NavBar'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import { SpinnerComponent } from '../../components/SpinnerComponent/SpinnerComponent'
import './ArtworkDetails.css'
// import { userArtworkData } from '../userArtworkSlice'
import {
  addComment,
  addRating,
  bringAllUserArtworks,
  deleteComment,
  deleteRating,
  updateComment,
  updateRating,
} from '../../services/apiCalls'
import { userData } from '../userSlice'
import { InputText } from '../../components/InputText/InputText'
import { validate } from '../../helpers/useful'

export const ArtworkDetails = () => {
  const navigate = useNavigate()

  const userCredentialsRdx = useSelector(userData)
  const artworkSelectedRdx = useSelector(artworkData)
  const artworkSelectedObj = artworkSelectedRdx.choosenArtwork
  // const userArtworkSelectedRdx = useSelector(userArtworkData)
  // const userArtworkSelectedObj = userArtworkSelectedRdx.choosenUserArtwork
  // const params = userArtworkSelectedObj.id
  const [myUserArtwork, setMyUserArtwork] = useState([])
  const [allUserArtworks, setAllUserArtworks] = useState([])
  const [allUserArtworksSelected, setAllUserArtworksSelected] = useState([])
  const [allUserArtworksSelectedWithComment, setAllUserArtworksSelectedWithComment] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentRating, setCommentRating] = useState({
    artwork_id: artworkSelectedObj.id,
    comment: '',
    rating: null,
  })
  const [averageRating, setAverageRating] = useState(null)
  const [commentRatingAct, setCommentRatingAct] = useState(false)

  let totalRating = 0

  const ratingSum = (res) => {
    for (let i = 0; i < res.length; i++) {
      if (res[i].rating !== null) {
        totalRating += res[i].rating
      }
    }
    return totalRating
  }

  const inputHandler = (e) => {
    setCommentRating((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    if (allUserArtworks.length === 0) {
      setTimeout(() => {
        bringAllUserArtworks(userCredentialsRdx.credentials.token)
          .then((result) => {
            setLoading(false)

            if (result.data.data.length === 0) {
              return
            }
            setAllUserArtworks(result.data.data)


            const myUserArtworkSelected = result.data.data.filter((userArtwork) => {
              return (
                userArtwork.user_id === userCredentialsRdx.credentials.user.userId
              )
            })
            console.log(myUserArtworkSelected);
            if (myUserArtworkSelected.length === 0) {
              setMyUserArtwork(null)
            } else {
              setMyUserArtwork(myUserArtworkSelected[0])

            }

          })
          .catch((error) => console.log(error))
      }, 2000)
    }
  }, [allUserArtworks])

console.log(myUserArtwork);

useEffect(() => {
  if (allUserArtworks.length > 0) {
    /////////////// Getting all user_artworks registered for this selected artwork
    const selectedUserArtworks = allUserArtworks.filter((userArtwork) => {
      return (
        artworkSelectedObj.id === userArtwork.artwork_id 
      )
    })
    setAllUserArtworksSelected(selectedUserArtworks)
  }
},[allUserArtworks])


  useEffect(() => {
    if (allUserArtworksSelected.length > 0) {
      /////////////// Getting all user_artworks registered for this selected artwork with comments not null
      const selectedUserArtworksWithComment = allUserArtworksSelected.filter((userArtworkSelected) => {
        return (
          userArtworkSelected.comment !== null
        )
      })
      setAllUserArtworksSelectedWithComment(selectedUserArtworksWithComment)
      /////////////// Saving average rating
    //   let avgRating = 0

    //   const ratingsNotNull = allUserArtworks.filter((userArtwork) => {
    //     return (
    //       artworkSelectedObj.id === userArtwork.artwork_id &&
    //     userArtwork.rating !== null
    //     )
    //   })
    //   if (ratingsNotNull.length > 0) {
    //     let totalRating = ratingSum(ratingsNotNull)

        
    //    console.log(ratingsNotNull.length);
    //     avgRating = Math.floor(totalRating / ratingsNotNull.length)
    //    console.log(avgRating);

    //   }
    //   setAverageRating(avgRating)
    }
  }, [allUserArtworks])

console.log(allUserArtworksSelected, "registros con artwork id seleccionado");
console.log(allUserArtworksSelectedWithComment, "registros con artwork id seleccionado y comentario no NULL");

  useEffect(() => {
          /////////////// Saving average rating

    const ratingsNotNull = allUserArtworksSelected.filter((userArtwork) => {
      return (
              userArtwork.rating !== null
      )
    })
    
    if (ratingsNotNull.length > 0) {
    let newTotalRating = ratingSum(ratingsNotNull)

    let avgRating = Math.floor(newTotalRating / ratingsNotNull.length)
    setAverageRating(avgRating)
  } else {
    setAverageRating(null)
  }

  }, [allUserArtworks])


  const [valiCommentRating, setValiCommentRating] = useState({
    commentVali: false,
    ratingVali: false,
  })

  const [commentRatingError, setCommentRatingError] = useState({
    commentError: false,
    ratingError: false,
  })

  useEffect(() => {
    for (let error in commentRatingError) {
      if (commentRatingError[error] != '') {
        setCommentRatingAct(false)
        return
      }
    }

    for (let empty in commentRating) {
      if (commentRating[empty] === '') {
        setCommentRatingAct(false)
        return
      }
    }

    for (let validated in valiCommentRating) {
      if (valiCommentRating[validated] === false) {
        setCommentRatingAct(false)
        return
      }
    }
    setCommentRatingAct(true)
  })

  const checkError = (e) => {
    let error = ''

    let checked = validate(e.target.name, e.target.value, e.target.required)

    error = checked.message

    setValiCommentRating((prevState) => ({
      ...prevState,
      [e.target.name + 'Vali']: checked.validated,
    }))

    setCommentRatingError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }))
  }

  const createOrUpdateComment = (myUserArtwork) => {
console.log(myUserArtwork);
    if (!myUserArtwork || myUserArtwork.comment === null) {
      addComment({ comment: commentRating.comment, artwork_id: myUserArtwork }, userCredentialsRdx.credentials.token)
      .then(() => {
        setAllUserArtworksSelected((prevState) =>
          prevState.map((userArtworkSelected) =>
            userArtworkSelected.user_id ===
            userCredentialsRdx.credentials.user.userId
              ? {
                  ...userArtworkSelected,
                  comment: commentRating.comment,
                }
              : userArtworkSelected
          )
        )
      })
    } else {
      updateComment(
        params,
        { comment: commentRating.comment },
        userCredentialsRdx.credentials.token
      )
      
      .then(() => {
        setAllUserArtworksSelected((prevState) =>
          prevState.map((userArtworkSelected) =>
            userArtworkSelected.user_id ===
            userCredentialsRdx.credentials.user.userId
              ? {
                  ...userArtworkSelected,
                  comment: commentRating.comment,
                }
              : userArtworkSelected
          )
        )
      })
      
    }
  }

  const deleteYourComment = (userArtworkSelectedObj) => {
    deleteComment(
      userArtworkSelectedObj.id,
      userCredentialsRdx.credentials.token
    ).then(() => {
      setAllUserArtworksSelected((prevState) =>
        prevState.map((userArtworkSelected) =>
          userArtworkSelected.user_id ===
          userCredentialsRdx.credentials.user.userId
            ? {
                ...userArtworkSelected,
                comment: null,
              }
            : userArtworkSelected
        )
      )
    })
  }

  const deleteYourRating = (myUserArtwork) => {
    deleteRating(
      myUserArtwork.id,
      userCredentialsRdx.credentials.token
    ).then(() => {
      setAllUserArtworks((prevState) =>
      prevState.map((userArtwork) =>
      userArtwork.user_id ===
        userCredentialsRdx.credentials.user.userId
          ? {
              ...userArtwork,
              rating: null,
            }
          : userArtwork
      )
    )
    })
  }

  const createOrUpdateRating = (myUserArtwork) => {

    
    if (myUserArtwork === null) {
      
      addRating({rating: parseInt(commentRating.rating), artwork_id:artworkSelectedObj.id },userCredentialsRdx.credentials.token)
      .then(() => {
        setAllUserArtworks((prevState) =>
        prevState.map((userArtwork) =>
        userArtwork.user_id ===
          userCredentialsRdx.credentials.user.userId
            ? {
                ...userArtwork,
                rating: parseInt(commentRating.rating),
              }
            : userArtwork
        )
      )
      })
    } else {

      updateRating(
        myUserArtwork.id,
        { rating: parseInt(commentRating.rating) },
        userCredentialsRdx.credentials.token
      ).then(() => {
  console.log(parseInt(commentRating.rating));
        setAllUserArtworks((prevState) =>
          prevState.map((userArtwork) =>
          userArtwork.user_id ===
            userCredentialsRdx.credentials.user.userId
              ? {
                  ...userArtwork,
                  rating: parseInt(commentRating.rating),
                }
              : userArtwork
          )
        )
      })
      .then()
    }
  }

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="spinnerDesign d-flex justify-content-center align-items-center flex-column">
          <SpinnerComponent message="Art is coming... hold on!" />
        </div>
      </>
    )
  } else if (allUserArtworks.length > 0) {
    return (
      <>
        <NavBar />

        <Container fluid className="mainContainer">
          <h2>Selected artwork in detail:</h2>
          <Row className="d-flex justify-content-center">
            <Col lg={4} className="me-5">
              <div className="cardsContainer d-flex ">
                <div className="artworkCardDetailsDesign ">
                  <p className="pe-4 titleFieldDesign">
                    {artworkSelectedObj.title}
                  </p>
                  <p>{artworkSelectedObj.description}</p>
                  <p>{artworkSelectedObj.Artist.artistic_name}</p>
                  <p>{artworkSelectedObj.category}</p>
                  <p>{artworkSelectedObj.technique}</p>
                  <p>{artworkSelectedObj.date_creation}</p>
                  <p>{artworkSelectedObj.dimensions}</p>

                  <p>{artworkSelectedObj.price}</p>
                  <div type="button" className="goToArtPageBtn">
                    GO TO THE ARTIST PERSONAL PAGE TO GET TO KNOW THEM
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} className="ms-5">
              <div>
                <img
                  className="ImgDesign"
                  src={`http://localhost:3000/static/${artworkSelectedObj.image_url}`}
                />
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={6}>
              <div className="commentsContainer">
                
                {/* mapping all registers where that artwork in particular has with any user  */}
                {allUserArtworksSelected.map((userArtworkSelected) => {
                  return (
                    <div
                      key={userArtworkSelected.id}
                      className="d-flex justify-content-between"
                    >
                      <div
                        className={
                          (userArtworkSelected.id === myUserArtwork.id && userArtworkSelected.comment !== null)
                          ? 'commentLine userComment m-0 w-100' :
                          (userArtworkSelected.id !== myUserArtwork.id && userArtworkSelected.comment !== null)  
                          ? 'commentLine m-0 w-100'
                          : ''
                        }
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="m-0">{userArtworkSelected.comment}</p>
                        </div>
                      </div>
                      {(userArtworkSelected.id === myUserArtwork.id && userArtworkSelected.comment !== null) ? (
                        <button
                          onClick={() =>
                            deleteYourComment(myUserArtwork)
                          }
                          className="buttonSubmitCommentDesign"
                        >
                          Delete
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )
                })}
                <div className="d-flex justify-content-center align-items-center">
                  <InputText
                    className={
                      commentRatingError.nameError === ''
                        ? 'inputsDesignCommon inputBasicDesign commentInput'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign commentInput'
                    }
                    type={'text'}
                    name={'comment'}
                    placeholder="Add new comment or update your comment"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  {commentRatingError.nameError}
                  <button
                    className="ps-3 pe-3 mt-3 mb-3 buttonSubmitCommentDesign d-flex justify-content-center align-items-center"
                    onClick={() => {
                      createOrUpdateComment(myUserArtwork)
                    }}
                    // commentRatingAct
                    // ?
                    //  () => {
                    //   createOrUpdateComment(userArtworkSelected)

                    //   }
                    //     : () => {}
                    // }
                  >
                    Submit{' '}
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={2}>
              <div className="ratingContainer d-flex justify-content-center flex-column align-items-center">
                <div>
                  {averageRating === null ?  <p className="ratingStyle">0</p> :   <p className="ratingStyle">{averageRating}</p>}
                
                </div>

                <div className="d-flex justify-content-center flex-column align-items-center">
                {allUserArtworksSelected.map((userArtworkSelected)=>{
                  return(
                  <div key={userArtworkSelected.id}> {(userArtworkSelected.id === myUserArtwork.id && userArtworkSelected.rating !== null) ? `Your rating is: ${userArtworkSelected.rating}` : <div></div>}</div>
                )
                })} 
                  <InputText
                    className={
                      commentRatingError.nameError === ''
                        ? 'inputsDesignCommon inputBasicDesign ratingInput'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign ratingInput'
                    }
                    type={'text'}
                    name={'rating'}
                    placeholder="Add new rating"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  {commentRatingError.nameError}
                  <button
                    className="ps-3 pe-3 mt-3 mb-3 buttonSubmitRatingDesign d-flex justify-content-center align-items-center"
                    onClick={() => {
                      createOrUpdateRating(myUserArtwork)
                    }}
                    // commentRatingAct
                    // ?
                    //  () => {
                    //   createOrUpdateComment(userArtworkSelected)

                    //   }
                    //     : () => {}
                    // }
                  >
                    Submit{' '}
                  </button>
                  <button
                    className="ps-3 pe-3 mt-3 mb-3 buttonSubmitRatingDesign d-flex justify-content-center align-items-center"
                    onClick={() => {
                      deleteYourRating(myUserArtwork)
                    }}
                    // commentRatingAct
                    // ?
                    //  () => {
                    //   createOrUpdateComment(userArtworkSelected)

                    //   }
                    //     : () => {}
                    // }
                  >
                    Delete{' '}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
