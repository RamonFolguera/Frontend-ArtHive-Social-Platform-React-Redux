import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { artworkData } from '../artworkSlice'
import { useSelector } from 'react-redux'
import { NavBar } from '../../components/Navbar/NavBar'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import { SpinnerComponent } from '../../components/SpinnerComponent/SpinnerComponent'
import './ArtworkDetails.css'
import { userArtworkData } from '../userArtworkSlice'
import {
  addComment,
  bringAllUserArtworks,
  logMe,
  updateComment,
} from '../../services/apiCalls'
import { userData } from '../userSlice'
import { InputText } from '../../components/InputText/InputText'
import { validate } from '../../helpers/useful'

export const ArtworkDetails = () => {
  const navigate = useNavigate()

  const userCredentialsRdx = useSelector(userData)
  const artworkSelectedRdx = useSelector(artworkData)
  const artworkSelectedObj = artworkSelectedRdx.choosenArtwork

  const userArtworkSelectedRdx = useSelector(userArtworkData)
  const userArtworkSelectedObj = userArtworkSelectedRdx.choosenUserArtwork
  const params = userArtworkSelectedObj.id

  const [allUserArtworks, setAllUserArtworks] = useState([])
  const [allUserArtworksSelected, setAllUserArtworksSelected] = useState([])
  const [myUserArtworksSelected, setMyUserArtworksSelected] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentRating, setCommentRating] = useState({
    artwork_id: artworkSelectedObj.id,
    comment: '',
    rating: '',
  })
  const [addingComment, setAddingComment] = useState('')
  const [averageRating, setAverageRating] = useState(null)

  const [commentRatingAct, setCommentRatingAct] = useState(false)

  console.log(userArtworkSelectedRdx)
  console.log(artworkSelectedObj.id)

  let totalRating = 0
  const ratingSum = (res) => {
    for (let i = 0; i < res.length; i++) {
      totalRating += res[i].rating
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

            /////////////// Getting all user_artworks registered for this selected artwork with comments not null
            const selectedUserArtworks = []
            result.data.data.forEach((userArtwork) => {
              if (
                artworkSelectedObj.id === userArtwork.artwork_id &&
                userArtwork.comment !== null
              ) {
                selectedUserArtworks.push(userArtwork)
              }
            })
            setAllUserArtworksSelected(selectedUserArtworks)

            /////////////// Saving average rating
            const totalRating = ratingSum(result.data.data)
            const avgRating = Math.floor(totalRating / result.data.data.length)
            setAverageRating(avgRating)
          })
          .catch((error) => console.log(error))
      }, 2000)
    }
  }, [allUserArtworks, allUserArtworksSelected])

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

  const createOrUpdateComment = (userArtworkSelectedObj) => {
    console.log(userArtworkSelectedObj)

    if (userArtworkSelectedObj.comment === null) {
      addComment(userCredentialsRdx).then(() => {
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
      console.log(commentRating.comment, 'entro en update')
      updateComment(
        params,
        { comment: commentRating.comment },
        userCredentialsRdx.credentials.token
      ).then(() => {
        console.log(allUserArtworksSelected)
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
                    <div className="commentLine" key={userArtworkSelected.id}>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="m-0">{userArtworkSelected.comment}</p>
                      </div>
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
                      createOrUpdateComment(userArtworkSelectedObj)
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
              <div className="ratingContainer">{averageRating}</div>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
